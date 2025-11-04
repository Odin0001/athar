'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useTranslation } from '@/components/LanguageProvider'

gsap.registerPlugin(ScrollTrigger)

export default function PinnedHeadings() {
  const { t } = useTranslation()
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const triggerEl = container.querySelector('.pinned-trigger')
    const pinEl = container.querySelector('.pinned-pin')
    const slides = container.querySelectorAll('.slide')

    // --- Pin the section ---
    const mainTrigger = ScrollTrigger.create({
      trigger: triggerEl,
      pin: pinEl,
      start: 'top top',
      end: () => `+=${(slides.length - 1) * window.innerHeight}`,
      scrub: true,
    })

    // --- Create timeline for the backgrounds ---
    const bgTl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top top',
        end: () => `+=${(slides.length - 1) * window.innerHeight}`,
        scrub: true,
      },
    })

    slides.forEach((slide, i) => {
      const bg = slide.querySelector('.bg')
      const heading = slide.querySelector('h2')

      // initial state
      gsap.set(bg, { opacity: i === 0 ? 1 : 0 })
      gsap.set(heading, { y: 150, opacity: 0 })

      // fade background transitions
      if (i > 0) {
        bgTl.to(slides[i - 1].querySelector('.bg'), { opacity: 0, duration: 1, ease: 'power1.out' }, i)
        bgTl.to(bg, { opacity: 1, duration: 1, ease: 'power1.in' }, i)
      }

      // text animation
      gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: () => `top+=${i * window.innerHeight} top`,
          end: () => `top+=${(i + 1) * window.innerHeight} top`,
          scrub: true,
        },
      })
        .to(heading, { y: 0, opacity: 1, ease: 'power1.out' })
        .to(heading, { y: -150, opacity: 0, ease: 'power1.in' }, '+=0.5')
    })

    // cleanup only this component’s triggers
    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger && triggerEl.contains(t.trigger)) t.kill()
      })
    }
  }, [])

  const slides = [
    {
      text: <p className="lg:text-[8vw] text-3xl text-center max-w-7xl mx-auto">{t('home.thirdSection.title')}</p>,
      image: '/dummy.jpg',
    },
    {
      text: <p className="lg:text-6xl text-3xl text-center max-w-7xl mx-auto">{t('home.thirdSection.firstSentence')}</p>,
      image: '/dummy2.jpg',
    },
    {
      text: <p className="lg:text-6xl text-3xl text-center max-w-7xl mx-auto">{t('home.thirdSection.secondSentence')}</p>,
      image: '/dummy.jpg',
    },
    {
      text: <p className="lg:text-6xl text-3xl text-center max-w-7xl mx-auto">{t('home.fourthSection.sentence')}</p>,
      image: '/dummy2.jpg',
    },
  ]

  return (
    <main ref={containerRef} className="pinned-headings-wrapper relative min-h-[500vh] bg-black">
      <section className="pinned-trigger relative h-[500vh]">
        <div className="pinned-pin relative h-screen w-full overflow-hidden">
          {slides.map((slide, i) => (
            <div key={i} className="slide absolute inset-0">
              <div
                className="bg absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  opacity: i === 0 ? 1 : 0,
                }}
              />
              <h2 className="absolute top-1/2 left-0 w-full text-center text-white font-extrabold z-20">
                {slide.text}
              </h2>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
