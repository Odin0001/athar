'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CASE_STUDIES_BUCKET, storagePathFromUrl } from '@/lib/supabase/storage'
import { revalidateCaseStudies } from '@/app/admin/actions'
import CaseStudyForm from './CaseStudyForm'

export default function AdminDashboard({ userEmail, isAdmin, initialCaseStudies, loadError }) {
  const [caseStudies, setCaseStudies] = useState(initialCaseStudies)
  // null = list view, {} = new case study, row = editing that row
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState(loadError || '')

  const handleSaved = (saved, previousSlug) => {
    setCaseStudies((prev) => {
      const exists = prev.some((c) => c.id === saved.id)
      return exists ? prev.map((c) => (c.id === saved.id ? saved : c)) : [saved, ...prev]
    })
    revalidateCaseStudies([saved.slug, previousSlug])
    setEditing(null)
  }

  const handleDelete = async (caseStudy) => {
    if (!confirm(`Delete "${caseStudy.title_en}"? This cannot be undone.`)) return
    setError('')

    const supabase = createClient()
    const { error } = await supabase.from('case_studies').delete().eq('id', caseStudy.id)
    if (error) {
      setError(error.message)
      return
    }

    const paths = [caseStudy.cover_image, ...(caseStudy.gallery || [])]
      .map(storagePathFromUrl)
      .filter(Boolean)
    if (paths.length) await supabase.storage.from(CASE_STUDIES_BUCKET).remove(paths)

    setCaseStudies((prev) => prev.filter((c) => c.id !== caseStudy.id))
    revalidateCaseStudies([caseStudy.slug])
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Case Studies Admin</h1>
          <p className="text-sm text-gray-300">Signed in as {userEmail}</p>
        </div>
        {editing === null && isAdmin && (
          <button
            onClick={() => setEditing({})}
            className="rounded-xl bg-mint-leaf px-5 py-2 font-semibold text-prussian-blue hover:opacity-90 cursor-pointer"
          >
            + New case study
          </button>
        )}
      </header>

      {!isAdmin && (
        <p className="mb-6 rounded-xl border border-strawberry-red/60 bg-strawberry-red/10 p-4 text-sm">
          This account is not in the admins list, so it can&apos;t add or change case studies.
          Add it with the last line of <code>supabase/schema.sql</code>.
        </p>
      )}

      {error && (
        <p className="mb-6 rounded-xl border border-strawberry-red/60 bg-strawberry-red/10 p-4 text-sm">
          {error}
        </p>
      )}

      {editing !== null ? (
        <CaseStudyForm
          caseStudy={editing.id ? editing : null}
          onCancel={() => setEditing(null)}
          onSaved={handleSaved}
        />
      ) : caseStudies.length === 0 ? (
        <p className="text-gray-300">No case studies yet.</p>
      ) : (
        <ul className="space-y-4">
          {caseStudies.map((caseStudy) => (
            <li
              key={caseStudy.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/15 bg-gray-900/40 p-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={caseStudy.cover_image}
                alt=""
                className="h-20 w-32 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{caseStudy.title_en}</p>
                <p className="font-semibold" dir="rtl">{caseStudy.title_ar}</p>
                <p className="text-xs text-gray-400">
                  /case-studies/{caseStudy.slug}
                  {!caseStudy.published && <span className="ms-2 text-neon-chartreuse">(draft)</span>}
                </p>
              </div>
              {isAdmin && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(caseStudy)}
                    className="rounded-lg border border-white/30 px-4 py-2 text-sm hover:bg-white/10 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(caseStudy)}
                    className="rounded-lg border border-strawberry-red/60 px-4 py-2 text-sm text-strawberry-red hover:bg-strawberry-red/10 cursor-pointer"
                  >
                    Delete
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
