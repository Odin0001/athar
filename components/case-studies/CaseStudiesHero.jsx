'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useTranslation } from '@/components/LanguageProvider'
import red from '@/public/red1.png'
import green from '@/public/green1.png'
import yellow from '@/public/yellow1.png'
import blue from '@/public/blue1.png'

const heroStyles = `
  .cs-float { animation: csFloat 9s ease-in-out infinite; }
  .cs-float-slow { animation: csFloat 13s ease-in-out infinite reverse; }

  @keyframes csFloat {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(14px, -22px); }
  }

  .cs-grid {
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
  }

  @media (prefers-reduced-motion: reduce) {
    .cs-float, .cs-float-slow { animation: none; }
  }
`

// Fanned positions for up to three cover images
const stackPositions = [
  'rotate-[-8deg] -translate-x-16 translate-y-6 z-10',
  'rotate-[6deg] translate-x-16 -translate-y-4 z-20',
  'rotate-[-1deg] translate-y-16 z-30',
]

const CaseStudiesHero = ({ covers, count }) => {
  const { t, lang } = useTranslation()
  const container = useRef(null)
  const isAr = lang === 'ar'

  useGSAP(() => {
    gsap.from('.cs-hero-text', {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
    })
    gsap.from('.cs-hero-card', {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      delay: 0.3,
      ease: 'power3.out',
    })
  }, { scope: container })

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={container}
      className='relative w-full min-h-screen overflow-hidden bg-prussian-blue flex items-center px-4 pt-32 pb-20'
    >
      <style>{heroStyles}</style>

      {/* Background decoration */}
      <div className='cs-grid absolute inset-0' />
      <div className='absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-mint-leaf/25 blur-[120px]' />
      <div className='absolute -bottom-48 -right-32 h-[520px] w-[520px] rounded-full bg-ice-blue/25 blur-[130px]' />
      <Image src={red} alt='' width={70} className='cs-float absolute top-36 right-[8%] opacity-80' />
      <Image src={yellow} alt='' width={45} className='cs-float-slow absolute bottom-24 left-[6%] opacity-80' />
      <Image src={green} alt='' width={55} className='cs-float-slow absolute top-[45%] left-[48%] opacity-70 lg:block hidden' />
      <Image src={blue} alt='' width={90} className='cs-float absolute bottom-16 right-[40%] opacity-60 lg:block hidden' />

      <div className={`relative z-10 max-w-7xl w-full mx-auto grid gap-16 items-center ${covers.length ? 'lg:grid-cols-2' : ''}`}>
        <div className={covers.length ? '' : 'max-w-4xl mx-auto text-center'}>
          <span className='cs-hero-text inline-block rounded-full border border-mint-leaf/60 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-mint-leaf mb-8'>
            {t('caseStudies.eyebrow')}
          </span>
          <h1 className='cs-hero-text lg:text-8xl md:text-6xl text-5xl font-extrabold text-white leading-tight mb-8'>
            {t('caseStudies.title')}
          </h1>
          <p className={`cs-hero-text lg:text-2xl text-lg text-gray-200 max-w-2xl mb-12 ${covers.length ? '' : 'mx-auto'}`}>
            {t('caseStudies.subtitle')}
          </p>

          <div className={`cs-hero-text flex flex-wrap items-center gap-8 ${covers.length ? '' : 'justify-center'}`}>
            <button
              onClick={scrollToProjects}
              className='rounded-full bg-mint-leaf px-8 py-3 font-semibold text-prussian-blue transition-colors duration-300 hover:bg-neon-chartreuse cursor-pointer'
            >
              {t('caseStudies.explore')} {isAr ? '↙' : '↘'}
            </button>
            {count > 0 && (
              <div className='flex items-baseline gap-3 text-white'>
                <span className='text-5xl font-extrabold text-neon-chartreuse'>{count}</span>
                <span className='text-lg text-gray-300'>{t('caseStudies.projectsLabel')}</span>
              </div>
            )}
          </div>
        </div>

        {covers.length > 0 && (
          <div className='relative h-[420px] md:h-[480px] flex items-center justify-center'>
            {covers.map((cover, i) => (
              <div
                key={cover.src}
                className={`cs-hero-card absolute w-[260px] md:w-[340px] aspect-[4/3] overflow-hidden rounded-3xl border-4 border-white/10 shadow-2xl shadow-black/60 ${stackPositions[i]}`}
              >
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  priority={i === 0}
                  sizes='340px'
                  className='object-cover'
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default CaseStudiesHero
