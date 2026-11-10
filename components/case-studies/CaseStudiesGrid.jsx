'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from '@/components/LanguageProvider'
import CaseStudiesHero from './CaseStudiesHero'

const CaseStudiesGrid = ({ caseStudies }) => {
  const { t, lang } = useTranslation()

  return (
    <main className='w-full min-h-screen bg-white' dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <CaseStudiesHero
        count={caseStudies.length}
        covers={caseStudies.slice(0, 3).map((c) => ({
          src: c.cover_image,
          alt: lang === 'ar' ? c.title_ar : c.title_en,
        }))}
      />

      <section id='projects' className='max-w-7xl mx-auto px-4 py-24 scroll-mt-24'>
        <h2 className='lg:text-5xl text-3xl font-bold text-prussian-blue mb-12'>
          {t('caseStudies.gridTitle')}
        </h2>

        {caseStudies.length === 0 ? (
          <p className='text-xl text-gray-500'>{t('caseStudies.empty')}</p>
        ) : (
          <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {caseStudies.map((caseStudy) => (
              <Link
                key={caseStudy.id}
                href={`/case-studies/${caseStudy.slug}`}
                className='group flex flex-col overflow-hidden rounded-3xl bg-prussian-blue shadow-xl transition-transform duration-300 hover:-translate-y-2'
              >
                <div className='relative aspect-[4/3] overflow-hidden'>
                  <Image
                    src={caseStudy.cover_image}
                    alt={lang === 'ar' ? caseStudy.title_ar : caseStudy.title_en}
                    fill
                    sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                  />
                </div>
                <div className='flex flex-1 flex-col gap-3 p-6 text-white'>
                  <h2 className='text-2xl font-bold'>
                    {lang === 'ar' ? caseStudy.title_ar : caseStudy.title_en}
                  </h2>
                  <p className='text-gray-200 line-clamp-3'>
                    {lang === 'ar' ? caseStudy.summary_ar : caseStudy.summary_en}
                  </p>
                  <span className='mt-auto pt-2 font-semibold text-mint-leaf'>
                    {t('caseStudies.viewProject')} {lang === 'ar' ? '←' : '→'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default CaseStudiesGrid
