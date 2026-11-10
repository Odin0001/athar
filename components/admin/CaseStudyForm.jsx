'use client'
import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CASE_STUDIES_BUCKET, storagePathFromUrl } from '@/lib/supabase/storage'
import { getYouTubeId } from '@/lib/youtube'

const MAX_IMAGE_MB = 5

const inputClass =
  'w-full rounded-xl border border-gray-500 bg-transparent px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-mint-leaf transition-colors'

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-|-$/g, '')

const emptyForm = {
  slug: '',
  title_en: '',
  title_ar: '',
  summary_en: '',
  summary_ar: '',
  challenge_en: '',
  challenge_ar: '',
  approach_en: '',
  approach_ar: '',
  results_en: '',
  results_ar: '',
  quote_en: '',
  quote_ar: '',
  quote_author_en: '',
  quote_author_ar: '',
  quote_role_en: '',
  quote_role_ar: '',
  sort_order: 0,
  published: true,
}

const emptyStat = { value: '', label_en: '', label_ar: '' }

function Section({ title, hint, children }) {
  return (
    <fieldset className="space-y-6 border-t border-white/15 pt-8">
      <legend className="pe-3 text-xl font-semibold">{title}</legend>
      {hint && <p className="-mt-2 text-sm text-gray-400">{hint}</p>}
      {children}
    </fieldset>
  )
}

function Field({ label, hint, children }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm text-gray-300">{label}</span>
      {children}
      {hint && <span className="block text-xs text-gray-400">{hint}</span>}
    </label>
  )
}

// Shows a preview for a File object and releases the blob URL afterwards
function FilePreview({ file, className }) {
  const url = useMemo(() => URL.createObjectURL(file), [file])
  useEffect(() => () => URL.revokeObjectURL(url), [url])
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt="" className={className} />
}

export default function CaseStudyForm({ caseStudy, onCancel, onSaved }) {
  const isEdit = Boolean(caseStudy)
  const [form, setForm] = useState(() =>
    isEdit
      ? Object.fromEntries(Object.keys(emptyForm).map((key) => [key, caseStudy[key] ?? emptyForm[key]]))
      : emptyForm
  )
  const [slugTouched, setSlugTouched] = useState(isEdit)
  const [coverFile, setCoverFile] = useState(null)
  const [keptGallery, setKeptGallery] = useState(caseStudy?.gallery ?? [])
  const [newGalleryFiles, setNewGalleryFiles] = useState([])
  const [stats, setStats] = useState(caseStudy?.stats ?? [])
  const [videos, setVideos] = useState(caseStudy?.videos ?? [])
  const [videoInput, setVideoInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const updateStat = (index, key, value) =>
    setStats((prev) => prev.map((stat, i) => (i === index ? { ...stat, [key]: value } : stat)))

  const addVideo = () => {
    const url = videoInput.trim()
    if (!url) return
    if (!getYouTubeId(url)) return setError('That doesn\'t look like a YouTube video link.')
    if (videos.includes(url)) return setError('This video is already added.')
    setError('')
    setVideos((prev) => [...prev, url])
    setVideoInput('')
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => {
      const next = { ...prev, [name]: type === 'checkbox' ? checked : value }
      if (name === 'title_en' && !slugTouched) next.slug = slugify(value)
      return next
    })
  }

  const checkFiles = (files) => {
    const tooBig = files.find((f) => f.size > MAX_IMAGE_MB * 1024 * 1024)
    if (tooBig) {
      setError(`"${tooBig.name}" is larger than ${MAX_IMAGE_MB}MB.`)
      return false
    }
    setError('')
    return true
  }

  const uploadImage = async (supabase, file, slug) => {
    const ext = file.name.split('.').pop().toLowerCase()
    const path = `${slug}/${crypto.randomUUID()}.${ext}`
    const { error } = await supabase.storage
      .from(CASE_STUDIES_BUCKET)
      .upload(path, file, { contentType: file.type, cacheControl: '31536000' })
    if (error) throw error
    return supabase.storage.from(CASE_STUDIES_BUCKET).getPublicUrl(path).data.publicUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const slug = slugify(form.slug)
    if (!slug) return setError('Slug is required (English letters, numbers and dashes).')
    if (!isEdit && !coverFile) return setError('A cover image is required.')

    const cleanStats = stats
      .map((stat) => ({
        value: stat.value.trim(),
        label_en: stat.label_en.trim(),
        label_ar: stat.label_ar.trim(),
      }))
      .filter((stat) => stat.value || stat.label_en || stat.label_ar)
    if (cleanStats.some((stat) => !stat.value || !stat.label_en || !stat.label_ar)) {
      return setError('Each number needs a value and a label in both English and Arabic.')
    }

    setSaving(true)
    const supabase = createClient()
    const uploaded = []

    try {
      let coverUrl = caseStudy?.cover_image
      if (coverFile) {
        coverUrl = await uploadImage(supabase, coverFile, slug)
        uploaded.push(coverUrl)
      }

      const newGalleryUrls = []
      for (const file of newGalleryFiles) {
        const url = await uploadImage(supabase, file, slug)
        uploaded.push(url)
        newGalleryUrls.push(url)
      }

      const payload = {
        ...form,
        slug,
        sort_order: Number(form.sort_order) || 0,
        cover_image: coverUrl,
        gallery: [...keptGallery, ...newGalleryUrls],
        stats: cleanStats,
        videos,
      }

      const query = isEdit
        ? supabase.from('case_studies').update(payload).eq('id', caseStudy.id)
        : supabase.from('case_studies').insert(payload)
      const { data, error } = await query.select().single()

      if (error) {
        throw error.code === '23505'
          ? new Error('Another case study already uses this slug.')
          : error
      }

      // Remove images that were replaced or taken out of the gallery
      if (isEdit) {
        const removed = [
          coverFile ? caseStudy.cover_image : null,
          ...(caseStudy.gallery ?? []).filter((url) => !keptGallery.includes(url)),
        ]
          .filter(Boolean)
          .map(storagePathFromUrl)
          .filter(Boolean)
        if (removed.length) await supabase.storage.from(CASE_STUDIES_BUCKET).remove(removed)
      }

      onSaved(data, caseStudy?.slug)
    } catch (err) {
      // Don't leave orphaned uploads behind when saving fails
      const paths = uploaded.map(storagePathFromUrl).filter(Boolean)
      if (paths.length) await supabase.storage.from(CASE_STUDIES_BUCKET).remove(paths)
      setError(err.message || 'Something went wrong.')
      setSaving(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl border border-white/20 bg-gray-900/50 p-6 sm:p-8 shadow-2xl shadow-black backdrop-blur-lg"
    >
      <h2 className="text-2xl font-semibold">{isEdit ? 'Edit case study' : 'New case study'}</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Title (English)">
          <input name="title_en" required value={form.title_en} onChange={handleChange} className={inputClass} />
        </Field>
        <Field label="العنوان (Arabic)">
          <input name="title_ar" required dir="rtl" value={form.title_ar} onChange={handleChange} className={inputClass} />
        </Field>

        <Field label="Card description (English)" hint="Short text shown on the case studies card.">
          <textarea name="summary_en" required rows={3} value={form.summary_en} onChange={handleChange} className={inputClass} />
        </Field>
        <Field label="وصف البطاقة (Arabic)" hint="Short text shown on the case studies card.">
          <textarea name="summary_ar" required rows={3} dir="rtl" value={form.summary_ar} onChange={handleChange} className={inputClass} />
        </Field>

        <Field label="Slug" hint={`Page address: /case-studies/${slugify(form.slug) || '…'}`}>
          <input
            name="slug"
            required
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true)
              handleChange(e)
            }}
            className={inputClass}
          />
        </Field>
        <Field label="Order" hint="Lower numbers appear first.">
          <input name="sort_order" type="number" value={form.sort_order} onChange={handleChange} className={inputClass} />
        </Field>
      </div>

      <Section title="Numbers" hint="Key results shown as big numbers, e.g. “+250%” with the label “Increase in sales”. Optional.">
        {stats.map((stat, index) => (
          <div key={index} className="grid gap-3 md:grid-cols-[160px_1fr_1fr_auto] items-end">
            <Field label="Number">
              <input
                value={stat.value}
                onChange={(e) => updateStat(index, 'value', e.target.value)}
                placeholder="+250%"
                className={inputClass}
              />
            </Field>
            <Field label="Label (English)">
              <input
                value={stat.label_en}
                onChange={(e) => updateStat(index, 'label_en', e.target.value)}
                placeholder="Increase in sales"
                className={inputClass}
              />
            </Field>
            <Field label="الوصف (Arabic)">
              <input
                dir="rtl"
                value={stat.label_ar}
                onChange={(e) => updateStat(index, 'label_ar', e.target.value)}
                placeholder="زيادة في المبيعات"
                className={inputClass}
              />
            </Field>
            <button
              type="button"
              onClick={() => setStats((prev) => prev.filter((_, i) => i !== index))}
              className="rounded-xl border border-strawberry-red/60 px-4 py-3 text-sm text-strawberry-red hover:bg-strawberry-red/10 cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setStats((prev) => [...prev, emptyStat])}
          className="rounded-xl border border-white/30 px-5 py-2 text-sm hover:bg-white/10 cursor-pointer"
        >
          + Add number
        </button>
      </Section>

      <Section title="Project story" hint="Shown on the project page. Leave an empty line between paragraphs. Empty sections are hidden.">
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="The challenge (English)">
            <textarea name="challenge_en" rows={6} value={form.challenge_en} onChange={handleChange} className={inputClass} />
          </Field>
          <Field label="التحدي (Arabic)">
            <textarea name="challenge_ar" rows={6} dir="rtl" value={form.challenge_ar} onChange={handleChange} className={inputClass} />
          </Field>
          <Field label="Our approach (English)">
            <textarea name="approach_en" rows={6} value={form.approach_en} onChange={handleChange} className={inputClass} />
          </Field>
          <Field label="نهجنا (Arabic)">
            <textarea name="approach_ar" rows={6} dir="rtl" value={form.approach_ar} onChange={handleChange} className={inputClass} />
          </Field>
          <Field label="Results (English)">
            <textarea name="results_en" rows={6} value={form.results_en} onChange={handleChange} className={inputClass} />
          </Field>
          <Field label="النتائج (Arabic)">
            <textarea name="results_ar" rows={6} dir="rtl" value={form.results_ar} onChange={handleChange} className={inputClass} />
          </Field>
        </div>
      </Section>

      <div className="space-y-3 border-t border-white/15 pt-8">
        <span className="block text-sm text-gray-300">Cover image (used on the card and at the top of the project page)</span>
        <div className="flex flex-wrap items-center gap-4">
          {coverFile ? (
            <FilePreview file={coverFile} className="h-28 w-44 rounded-lg object-cover" />
          ) : caseStudy?.cover_image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={caseStudy.cover_image} alt="" className="h-28 w-44 rounded-lg object-cover" />
          ) : null}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file && checkFiles([file])) setCoverFile(file)
              e.target.value = ''
            }}
            className="text-sm file:me-4 file:rounded-lg file:border-0 file:bg-white/15 file:px-4 file:py-2 file:text-white file:cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-3">
        <span className="block text-sm text-gray-300">Gallery images (optional, shown on the project page)</span>
        <div className="flex flex-wrap gap-4">
          {keptGallery.map((url) => (
            <div key={url} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-24 w-36 rounded-lg object-cover" />
              <button
                type="button"
                onClick={() => setKeptGallery((prev) => prev.filter((u) => u !== url))}
                className="absolute -top-2 -end-2 h-7 w-7 rounded-full bg-strawberry-red text-sm font-bold cursor-pointer"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
          {newGalleryFiles.map((file, i) => (
            <div key={`${file.name}-${i}`} className="relative">
              <FilePreview file={file} className="h-24 w-36 rounded-lg object-cover" />
              <button
                type="button"
                onClick={() => setNewGalleryFiles((prev) => prev.filter((_, j) => j !== i))}
                className="absolute -top-2 -end-2 h-7 w-7 rounded-full bg-strawberry-red text-sm font-bold cursor-pointer"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files || [])
            if (files.length && checkFiles(files)) setNewGalleryFiles((prev) => [...prev, ...files])
            e.target.value = ''
          }}
          className="text-sm file:me-4 file:rounded-lg file:border-0 file:bg-white/15 file:px-4 file:py-2 file:text-white file:cursor-pointer"
        />
      </div>

      <Section title="Videos" hint="Paste YouTube links (videos can be public or unlisted). Optional.">
        {videos.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {videos.map((url) => (
              <div key={url} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${getYouTubeId(url)}/hqdefault.jpg`}
                  alt=""
                  className="h-24 w-40 rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => setVideos((prev) => prev.filter((u) => u !== url))}
                  className="absolute -top-2 -end-2 h-7 w-7 rounded-full bg-strawberry-red text-sm font-bold cursor-pointer"
                  aria-label="Remove video"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          <input
            type="url"
            value={videoInput}
            onChange={(e) => setVideoInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addVideo()
              }
            }}
            placeholder="https://www.youtube.com/watch?v=…"
            className={`${inputClass} flex-1 min-w-[240px]`}
          />
          <button
            type="button"
            onClick={addVideo}
            className="rounded-xl border border-white/30 px-5 py-2 text-sm hover:bg-white/10 cursor-pointer"
          >
            + Add video
          </button>
        </div>
      </Section>

      <Section title="Client quote" hint="Shown at the end of the project page. Leave the quote empty to hide it.">
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Quote (English)">
            <textarea name="quote_en" rows={4} value={form.quote_en} onChange={handleChange} className={inputClass} />
          </Field>
          <Field label="الاقتباس (Arabic)">
            <textarea name="quote_ar" rows={4} dir="rtl" value={form.quote_ar} onChange={handleChange} className={inputClass} />
          </Field>
          <Field label="Client name (English)">
            <input name="quote_author_en" value={form.quote_author_en} onChange={handleChange} className={inputClass} />
          </Field>
          <Field label="اسم العميل (Arabic)">
            <input name="quote_author_ar" dir="rtl" value={form.quote_author_ar} onChange={handleChange} className={inputClass} />
          </Field>
          <Field label="Position / company (English)" hint="e.g. Marketing Director, Acme">
            <input name="quote_role_en" value={form.quote_role_en} onChange={handleChange} className={inputClass} />
          </Field>
          <Field label="المنصب / الشركة (Arabic)">
            <input name="quote_role_ar" dir="rtl" value={form.quote_role_ar} onChange={handleChange} className={inputClass} />
          </Field>
        </div>
      </Section>

      <label className="flex items-center gap-3 border-t border-white/15 pt-8">
        <input type="checkbox" name="published" checked={form.published} onChange={handleChange} className="h-5 w-5" />
        <span>Published (visible on the website)</span>
      </label>

      {error && <p className="text-sm text-strawberry-red">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-mint-leaf px-6 py-3 font-semibold text-prussian-blue hover:opacity-90 disabled:opacity-50 cursor-pointer"
        >
          {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create case study'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="rounded-xl border border-white/30 px-6 py-3 hover:bg-white/10 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
