import { cache } from 'react'
import { notFound } from 'next/navigation'
import { createPublicClient } from '@/lib/supabase/server'
import CaseStudyDetail from '@/components/case-studies/CaseStudyDetail'

export const revalidate = 300

const getCaseStudy = cache(async (slug) => {
  const supabase = createPublicClient()
  const { data } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()
  return data
})

export async function generateMetadata({ params }) {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug)
  if (!caseStudy) return { title: 'Case Study — Athar' }

  return {
    title: `${caseStudy.title_en} — Athar`,
    description: caseStudy.summary_en,
    openGraph: {
      title: `${caseStudy.title_en} — Athar`,
      description: caseStudy.summary_en,
      url: `https://www.athar.agency/case-studies/${slug}`,
      siteName: "Athar",
      images: [{ url: caseStudy.cover_image }],
      type: "article",
    },
    alternates: {
      canonical: `https://www.athar.agency/case-studies/${slug}`,
    }
  }
}

const page = async ({ params }) => {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug)
  if (!caseStudy) notFound()

  return <CaseStudyDetail caseStudy={caseStudy} />
}

export default page
