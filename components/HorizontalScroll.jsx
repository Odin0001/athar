'use client'
import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '@/components/LanguageProvider'
import Image from 'next/image'
import dummy from '@/public/dummy.jpg'
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalScroll() {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  const panelsWrapperRef = useRef(null)
  const panelRefs = useRef([])

  const panels = [
    { 
      title: t('home.secondSection.firstList.title'), 
      firstSentence: t('home.secondSection.firstList.firstSentence'),
      secondSentence: t('home.secondSection.firstList.secondSentence'),
      thirdSentence: t('home.secondSection.firstList.thirdSentence'),
      fourthSentence: t('home.secondSection.firstList.fourthSentence'),
      img: dummy 
    },
    { 
      title: t('home.secondSection.secondList.title'), 
      firstSentence: t('home.secondSection.secondList.firstSentence'),
      secondSentence: t('home.secondSection.secondList.secondSentence'),
      thirdSentence: t('home.secondSection.secondList.thirdSentence'),
      fourthSentence: t('home.secondSection.secondList.fourthSentence'),
      fifthSentence: t('home.secondSection.secondList.fifthSentence'),
      img: dummy 
    },
    { 
      title: t('home.secondSection.thirdList.title'), 
      firstSentence: t('home.secondSection.thirdList.firstSentence'),
      secondSentence: t('home.secondSection.thirdList.secondSentence'),
      thirdSentence: t('home.secondSection.thirdList.thirdSentence'),
      fourthSentence: t('home.secondSection.thirdList.fourthSentence'),
      img: dummy 
    },
    { 
      title: t('home.secondSection.fourthList.title'), 
      firstSentence: t('home.secondSection.fourthList.firstSentence'),
      secondSentence: t('home.secondSection.fourthList.secondSentence'),
      thirdSentence: t('home.secondSection.fourthList.thirdSentence'),
      fourthSentence: t('home.secondSection.fourthList.fourthSentence'),
      img: dummy 
    },
  ]

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current
      const panelsWrapper = panelsWrapperRef.current
      const panelsArray = panelRefs.current

      if (!container || !panelsWrapper) return

      // ✅ Hardware acceleration for smooth transforms
      gsap.set(panelsArray, { force3D: true, willChange: 'transform' })
      gsap.set(panelsWrapper, { willChange: 'transform' })

      // ✅ Avoid forcing layout reflows
      const totalScroll = panelsWrapper.scrollWidth - window.innerWidth

      // ✅ Simplified animation — only translate the wrapper
      const tween = gsap.to(panelsWrapper, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          end: () => `+=${totalScroll}`,
        },
      })

      return () => {
        tween.kill()
        ScrollTrigger.getAll().forEach(t => t.kill())
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="horizontal-scroll-container relative w-full h-screen overflow-hidden"
    >
      <div
        ref={panelsWrapperRef}
        className="horizontal-scroll-inner flex flex-nowrap h-full w-max"
      >
        {panels.map((panel, index) => (
          <section
            key={index}
            ref={(el) => (panelRefs.current[index] = el)}
            className="horizontal-panel flex-shrink-0 w-screen h-screen flex justify-center items-center text-white text-5xl relative"
          >
            <Image
              src={panel.img}
              alt={panel.title}
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-cover absolute -z-10 will-change-transform"
            />
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg max-w-5xl">
              <h2 className="lg:text-9xl text-4xl text-center font-bold mb-4">{panel.title}</h2>
              <ul className="grid grid-cols-1 gap-2 items-center text-xl">
                {panel.firstSentence && <li className="flex justify-between items-center py-2 px-4 lg:text-md text-sm rounded-full bg-black border border-gray-200">
                  {panel.firstSentence} 
                  <Link href='/services'>
                    <LuSquareArrowOutUpRight size={20} />
                  </Link>
                </li>}
                {panel.secondSentence && <li className="flex justify-between items-center py-2 px-4 lg:text-md text-sm rounded-full bg-black border border-gray-200">
                  {panel.secondSentence} 
                  <Link href='/services'>
                    <LuSquareArrowOutUpRight size={20} />
                  </Link>
                </li>}
                {panel.thirdSentence && <li className="flex justify-between items-center py-2 px-4 lg:text-md text-sm rounded-full bg-black border border-gray-200">
                  {panel.thirdSentence} 
                  <Link href='/services'>
                    <LuSquareArrowOutUpRight size={20} />
                  </Link>
                </li>}
                {panel.fourthSentence && <li className="flex justify-between items-center py-2 px-4 lg:text-md text-sm rounded-full bg-black border border-gray-200">
                  {panel.fourthSentence} 
                  <Link href='/services'>
                    <LuSquareArrowOutUpRight size={20} />
                  </Link>
                </li>}
                {panel.fifthSentence && <li className="flex justify-between items-center py-2 px-4 lg:text-md text-sm rounded-full bg-black border border-gray-200">
                  {panel.fifthSentence} 
                  <Link href='/services'>
                    <LuSquareArrowOutUpRight size={20} />
                  </Link>
                </li>}
              </ul>

            </div>
          </section>
        ))}
      </div>
    </section>
  )
}
