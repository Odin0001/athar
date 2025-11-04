'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Lenis from '@studio-freight/lenis'
import { useTranslation } from '@/components/LanguageProvider'

gsap.registerPlugin(ScrollTrigger)

export default function ParallaxSlides() {

  const { t } = useTranslation()

  const slides = [
    {
      img: 'https://placedog.net/1920?id=1',
      title: t('services.firstSection.title'),
      firstSentece: t('services.firstSection.firstSentence'),
      secondSentence: t('services.firstSection.secondSentence'),
      list: [
        t('services.firstSection.list.item1'),
        t('services.firstSection.list.item2'),
        t('services.firstSection.list.item3'),
        t('services.firstSection.list.item4'),
      ]
    },
    {
      img: 'https://placedog.net/1920?id=2',
      title: t('services.secondSection.title'),
      firstSentece: t('services.secondSection.firstSentence'),
      list: [
        t('services.secondSection.list.item1'),
        t('services.secondSection.list.item2'),
        t('services.secondSection.list.item3'),
        t('services.secondSection.list.item4'),
        t('services.secondSection.list.item5'),
      ]
    },
    {
      img: 'https://placedog.net/1920?id=3',
      title: t('services.thirdSection.title'),
      firstSentece: t('services.thirdSection.firstSentence'),
      list: [
        t('services.thirdSection.list.item1'),
        t('services.thirdSection.list.item2'),
        t('services.thirdSection.list.item3'),
        t('services.thirdSection.list.item4'),
      ]
    },
    {
      img: 'https://placedog.net/1920?id=4',
      title: t('services.fourthSection.title'),
      firstSentece: t('services.fourthSection.firstSentence'),
      list: [
        t('services.fourthSection.list.item1'),
        t('services.fourthSection.list.item2'),
        t('services.fourthSection.list.item3'),
        t('services.fourthSection.list.item4'),
        t('services.fourthSection.list.item5'),
      ]
    },
  ]

  useEffect(() => {
    // --- Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // --- Sync Lenis scroll with GSAP ScrollTrigger
    function raf(time) {
      lenis.raf(time)
      ScrollTrigger.update()
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // --- Parallax logic
    const slides = gsap.utils.toArray('.slide')
    const getRatio = (el) =>
      window.innerHeight / (window.innerHeight + el.offsetHeight)

    slides.forEach((slide, i) => {
      const bg = slide.querySelector('.background')
      const content = slide.querySelector('.content')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slide,
          start: () => (i ? 'top bottom' : 'top top'),
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      tl.fromTo(
        bg,
        {
          y: () => (i ? -window.innerHeight * getRatio(slide) : 0),
        },
        {
          y: () => window.innerHeight * (1 - getRatio(slide)),
          ease: 'none',
        }
      )

      tl.fromTo(
        content,
        {
          y: () => (i ? window.innerHeight * -getRatio(slide) * 2 : 0),
        },
        {
          y: () => window.innerHeight * getRatio(slide) * 2,
          ease: 'none',
        },
        0
      )
    })

    // --- Cleanup
    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <main className="flex flex-col w-full">
      {/* Top Section */}
      <section className="min-h-[50vh] flex items-center justify-center text-center text-[50px] font-bold">
        Some Title
      </section>

      {/* Slides */}
      <section className="relative w-full flex flex-col">
        <ul className="flex flex-col w-full">
          {slides.map((slide, i) => (
            <li key={i} className="slide relative flex w-screen h-screen overflow-hidden">
              <div
                className="background absolute top-0 left-0 w-screen h-screen bg-center bg-cover will-change-transform"
                style={{ backgroundImage: `url(${slide.img})` }}
              ></div>
              
              <div className="content relative flex flex-col justify-center items-center text-center w-[95%] max-w-7xl mx-auto p-12 text-white uppercase font-medium text-[4.6rem] leading-[1.25em]">
                <h2 className="mb-6 md:text-4xl text-2xl">{slide.title}</h2>
                <p className="mb-6 md:text-xl text-lg">{slide.firstSentece}</p>
                {slide.secondSentence && (
                  <p className="mb-6 md:text-xl text-lg">{slide.secondSentence}</p>
                )}
                <ul className="mt-6 md:text-xl text-lg">
                  {slide.list.map((item, idx) => (
                    <li key={idx} className="mb-2">{item}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Bottom Section */}
      <section className="min-h-[50vh] flex items-center justify-center text-center text-[50px] font-bold">
        End Of The Section
      </section>
    </main>
  )
}
