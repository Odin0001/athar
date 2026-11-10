'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { LOGOS_BUCKET, storagePathFromUrl } from '@/lib/supabase/storage'
import { revalidateLogos } from '@/app/admin/actions'

const MAX_LOGO_MB = 2

export default function LogosManager({ isAdmin, initialLogos, loadError }) {
  const [logos, setLogos] = useState(initialLogos)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(loadError || '')

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || [])
    e.target.value = ''
    if (!files.length) return
    setError('')

    const notImage = files.find((f) => !f.type.startsWith('image/'))
    if (notImage) return setError(`"${notImage.name}" is not an image.`)
    const tooBig = files.find((f) => f.size > MAX_LOGO_MB * 1024 * 1024)
    if (tooBig) return setError(`"${tooBig.name}" is larger than ${MAX_LOGO_MB}MB.`)

    setUploading(true)
    const supabase = createClient()
    let nextOrder = logos.reduce((max, l) => Math.max(max, l.sort_order), -1) + 1
    const added = []

    for (const file of files) {
      const ext = file.name.split('.').pop().toLowerCase()
      const path = `${crypto.randomUUID()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from(LOGOS_BUCKET)
        .upload(path, file, { contentType: file.type, cacheControl: '31536000' })
      if (uploadError) {
        setError(uploadError.message)
        break
      }

      const imageUrl = supabase.storage.from(LOGOS_BUCKET).getPublicUrl(path).data.publicUrl
      const { data, error: insertError } = await supabase
        .from('logos')
        .insert({ image_url: imageUrl, sort_order: nextOrder++ })
        .select()
        .single()
      if (insertError) {
        await supabase.storage.from(LOGOS_BUCKET).remove([path])
        setError(insertError.message)
        break
      }
      added.push(data)
    }

    if (added.length) {
      setLogos((prev) => [...prev, ...added])
      revalidateLogos()
    }
    setUploading(false)
  }

  const handleDelete = async (logo) => {
    if (!confirm('Delete this logo?')) return
    setError('')

    const supabase = createClient()
    const { error } = await supabase.from('logos').delete().eq('id', logo.id)
    if (error) return setError(error.message)

    const path = storagePathFromUrl(logo.image_url, LOGOS_BUCKET)
    if (path) await supabase.storage.from(LOGOS_BUCKET).remove([path])

    setLogos((prev) => prev.filter((l) => l.id !== logo.id))
    revalidateLogos()
  }

  const handleMove = async (index, step) => {
    const target = index + step
    if (target < 0 || target >= logos.length) return
    setError('')

    const reordered = [...logos]
    ;[reordered[index], reordered[target]] = [reordered[target], reordered[index]]
    const withOrder = reordered.map((logo, i) => ({ ...logo, sort_order: i }))
    const changed = withOrder.filter((logo, i) => logo.sort_order !== reordered[i].sort_order)
    setLogos(withOrder)

    const supabase = createClient()
    const results = await Promise.all(
      changed.map((logo) =>
        supabase.from('logos').update({ sort_order: logo.sort_order }).eq('id', logo.id)
      )
    )
    const failed = results.find((r) => r.error)
    if (failed) setError(failed.error.message)
    revalidateLogos()
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Client Logos</h1>
          <p className="text-sm text-gray-300">
            Shown in the moving logo strip on the home page. Transparent PNG or SVG logos look best.
          </p>
        </div>
        {isAdmin && (
          <label
            className={`rounded-xl bg-mint-leaf px-5 py-2 font-semibold text-prussian-blue hover:opacity-90 cursor-pointer ${
              uploading ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            {uploading ? 'Uploading…' : '+ Upload logos'}
            <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
          </label>
        )}
      </header>

      {!isAdmin && (
        <p className="mb-6 rounded-xl border border-strawberry-red/60 bg-strawberry-red/10 p-4 text-sm">
          This account is not in the admins list, so it can&apos;t add or change logos.
          Add it with the last line of <code>supabase/schema.sql</code>.
        </p>
      )}

      {error && (
        <p className="mb-6 rounded-xl border border-strawberry-red/60 bg-strawberry-red/10 p-4 text-sm">
          {error}
        </p>
      )}

      {logos.length === 0 ? (
        <p className="text-gray-300">No logos yet.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {logos.map((logo, index) => (
            <li
              key={logo.id}
              className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-white p-4"
            >
              <div className="flex h-24 items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo.image_url} alt="" className="max-h-full max-w-full object-contain" />
              </div>
              {isAdmin && (
                <div className="flex items-center justify-between gap-1 text-prussian-blue">
                  <button
                    onClick={() => handleMove(index, -1)}
                    disabled={index === 0}
                    className="rounded-lg px-2 py-1 hover:bg-gray-200 disabled:opacity-30 cursor-pointer"
                    aria-label="Move earlier"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => handleDelete(logo)}
                    className="rounded-lg px-3 py-1 text-sm text-strawberry-red hover:bg-strawberry-red/10 cursor-pointer"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleMove(index, 1)}
                    disabled={index === logos.length - 1}
                    className="rounded-lg px-2 py-1 hover:bg-gray-200 disabled:opacity-30 cursor-pointer"
                    aria-label="Move later"
                  >
                    →
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
