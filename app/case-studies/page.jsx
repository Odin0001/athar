import { createPublicClient } from '@/lib/supabase/server'
import CaseStudiesGrid from '@/components/case-studies/CaseStudiesGrid'

export const revalidate = 300

export const metadata = {
  title: "Case Studies — Athar",
  description: "Explore Athar's case studies — branding, web, SEO and performance marketing projects.",
  openGraph: {
    title: "Case Studies — Athar",
    description: "Explore Athar's case studies — branding, web, SEO and performance marketing projects.",
    url: "https://www.athar.agency/case-studies",
    siteName: "Athar",
    images: [
      {
        url: "https://www.athar.agency/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Athar — Digital Marketing Agency",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: 'https://www.athar.agency/case-studies',
  }
}

const page = async () => {
  const supabase = createPublicClient()
  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('id, slug, title_en, title_ar, summary_en, summary_ar, cover_image')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  return <CaseStudiesGrid caseStudies={caseStudies ?? []} />
}

export default page
