'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from '@/components/LanguageProvider'
import { getYouTubeId } from '@/lib/youtube'

const toParagraphs = (text) =>
  (text || '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

const storyAccents = ['bg-strawberry-red', 'bg-ice-blue', 'bg-mint-leaf']

const CaseStudyDetail = ({ caseStudy }) => {
  const { t, lang } = useTranslation()
  const isAr = lang === 'ar'
  const pick = (field) => caseStudy[`${field}_${isAr ? 'ar' : 'en'}`]

  const title = pick('title')
  const stats = caseStudy.stats ?? []
  const videoIds = (caseStudy.videos ?? []).map(getYouTubeId).filter(Boolean)
  const story = [
    { key: 'challenge', paragraphs: toParagraphs(pick('challenge')) },
    { key: 'approach', paragraphs: toParagraphs(pick('approach')) },
    { key: 'results', paragraphs: toParagraphs(pick('results')) },
  ].filter((section) => section.paragraphs.length)
  const quote = pick('quote')?.trim()
  const quoteAuthor = pick('quote_author')
  const quoteRole = pick('quote_role')

  return (
    <main className='w-full min-h-screen bg-white' dir={isAr ? 'rtl' : 'ltr'}>
      <section className='relative w-full h-[70vh] min-h-[420px]'>
        <Image src={caseStudy.cover_image} alt={title} fill priority sizes='100vw' className='object-cover' />
        <div className='absolute inset-0 bg-gradient-to-t from-prussian-blue via-prussian-blue/40 to-transparent' />
        <div className='absolute bottom-0 inset-x-0 max-w-7xl mx-auto px-4 pb-12 text-white'>
          <Link href='/case-studies' className='inline-block mb-6 text-mint-leaf font-semibold hover:underline'>
            {isAr ? '→' : '←'} {t('caseStudies.back')}
          </Link>
          <h1 className='lg:text-7xl md:text-5xl text-4xl font-bold mb-4'>{title}</h1>
          <p className='lg:text-2xl text-lg max-w-3xl text-gray-100'>{pick('summary')}</p>
        </div>
      </section>

      {stats.length > 0 && (
        <section className='bg-prussian-blue'>
          <div className='max-w-7xl mx-auto px-4 py-16 grid gap-10 grid-cols-2 lg:grid-cols-4 justify-items-center text-center'>
            {stats.map((stat, i) => (
              <div key={i} className='flex flex-col gap-3'>
                <span className='lg:text-6xl text-4xl font-extrabold text-neon-chartreuse' dir='ltr'>
                  {stat.value}
                </span>
                <span className='lg:text-lg text-sm text-gray-200 max-w-[220px]'>
                  {isAr ? stat.label_ar : stat.label_en}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {story.length > 0 && (
        <section className='max-w-5xl mx-auto px-4 py-24 space-y-20'>
          {story.map((section, i) => (
            <div key={section.key} className='grid gap-6 md:grid-cols-[220px_1fr]'>
              <div>
                <span className={`block h-1.5 w-14 rounded-full mb-4 ${storyAccents[i % storyAccents.length]}`} />
                <h2 className='lg:text-4xl text-3xl font-bold text-prussian-blue'>
                  {t(`caseStudies.${section.key}`)}
                </h2>
              </div>
              <div className='space-y-5'>
                {section.paragraphs.map((paragraph, j) => (
                  <p key={j} className='lg:text-xl text-md text-gray-800 leading-relaxed whitespace-pre-line'>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {videoIds.length > 0 && (
        <section className='max-w-7xl mx-auto px-4 pb-16 grid gap-6 md:grid-cols-2'>
          {videoIds.map((id) => (
            <div
              key={id}
              className={`relative aspect-video overflow-hidden rounded-3xl shadow-xl bg-black ${videoIds.length === 1 ? 'md:col-span-2' : ''}`}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
                title={title}
                loading='lazy'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
                className='absolute inset-0 h-full w-full'
              />
            </div>
          ))}
        </section>
      )}

      {caseStudy.gallery?.length > 0 && (
        <section className='max-w-7xl mx-auto px-4 pb-24 grid gap-6 md:grid-cols-2'>
          {caseStudy.gallery.map((url, i) => (
            <div key={url} className='relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl'>
              <Image
                src={url}
                alt={`${title} ${i + 1}`}
                fill
                sizes='(min-width: 768px) 50vw, 100vw'
                className='object-cover'
              />
            </div>
          ))}
        </section>
      )}

      {quote && (
        <section className='bg-prussian-blue px-4 py-24'>
          <figure className='max-w-4xl mx-auto text-center text-white'>
            <span className='block text-8xl leading-none font-extrabold text-mint-leaf' aria-hidden='true'>
              {isAr ? '”' : '“'}
            </span>
            <blockquote className='lg:text-3xl text-xl font-medium leading-relaxed whitespace-pre-line'>
              {quote}
            </blockquote>
            {(quoteAuthor || quoteRole) && (
              <figcaption className='mt-10'>
                {quoteAuthor && <span className='block text-lg font-bold text-neon-chartreuse'>{quoteAuthor}</span>}
                {quoteRole && <span className='block text-gray-300'>{quoteRole}</span>}
              </figcaption>
            )}
          </figure>
        </section>
      )}
    </main>
  )
}

export default CaseStudyDetail
