'use client'
import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '@/components/LanguageProvider'
import Image from 'next/image'
import app1 from '@/public/app1.jpg'
import app2 from '@/public/app2.jpg'
import app3 from '@/public/app3.jpg'


gsap.registerPlugin(ScrollTrigger)

export default function HorizontalScroll() {
  const { t, lang } = useTranslation()
  const containerRef = useRef(null)
  const panelsWrapperRef = useRef(null)
  const panelRefs = useRef([])

  const panels = [
    { 
      title: t('ourApproach.firstSection.title'),
      subTitle1: t('ourApproach.firstSection.subTitle1'),
      firstSentence: t('ourApproach.firstSection.firstSentence'),
      subTitle2: t('ourApproach.firstSection.subTitle2'),
      secondSentence: t('ourApproach.firstSection.secondSentence'),
      subTitle3: t('ourApproach.firstSection.subTitle3'),
      thirdSentence: t('ourApproach.firstSection.thirdSentence'),
      subTitle4: t('ourApproach.firstSection.subTitle4'),
      fourthSentence: t('ourApproach.firstSection.fourthSentence'),
      img: app1 
    },
    { 
      title: t('ourApproach.secondSection.title'),
      subTitle1: t('ourApproach.secondSection.subTitle1'),
      firstSentence: t('ourApproach.secondSection.firstSentence'),
      subTitle2: t('ourApproach.secondSection.subTitle2'),
      secondSentence: t('ourApproach.secondSection.secondSentence'),
      subTitle3: t('ourApproach.secondSection.subTitle3'),
      thirdSentence: t('ourApproach.secondSection.thirdSentence'),
      subTitle4: t('ourApproach.secondSection.subTitle4'),
      fourthSentence: t('ourApproach.secondSection.fourthSentence'),
      img: app2 
    },
    { 
      title: t('ourApproach.thirdSection.title'),
      subTitle1: t('ourApproach.thirdSection.subTitle1'),
      firstSentence: t('ourApproach.thirdSection.firstSentence'),
      subTitle2: t('ourApproach.thirdSection.subTitle2'),
      secondSentence: t('ourApproach.thirdSection.secondSentence'),
      subTitle3: t('ourApproach.thirdSection.subTitle3'),
      thirdSentence: t('ourApproach.thirdSection.thirdSentence'),
      subTitle4: t('ourApproach.thirdSection.subTitle4'),
      fourthSentence: t('ourApproach.thirdSection.fourthSentence'),
      img: app3 
    }
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
        className="horizontal-scroll-inner flex flex-nowrap h-full max-w-7xl"
      >
        {panels.map((panel, index) => (
          <section
            key={index}
            ref={(el) => (panelRefs.current[index] = el)}
            className="horizontal-panel flex-shrink-0 w-screen h-screen flex lg:justify-center lg:items-center justify-center items-start text-white text-5xl relative"
          >
            <Image
              src={panel.img}
              alt={panel.title}
              fill
              sizes="(max-width: 640px) 100vw, 100vw"
              priority={index === 0}
              className="object-cover absolute -z-10"
            />
            <div className="max-w-5xl lg:px-0 px-10 lg:mt-0 mt-20">
              <h2 className="lg:text-6xl md:text-4xl text-lg lg:text-center font-bold lg:mb-4 mb-0" dir={lang === 'ar' ? 'rtl' : 'ltr'}>{panel.title}</h2>
              <ul className="grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-2 items-start">
                {panel.firstSentence && (
                  <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                    <h3 className='lg:mb-8 mb-3 text-neon-chartreuse font-semibold lg:text-xl text-sm'>{panel.subTitle1}</h3>
                    <li className='flex justify-between items-center lg:text-md text-xs'>
                      {panel.firstSentence}
                      {/* <Link href='/services'>
                        <LuSquareArrowOutUpRight size={20} />
                      </Link> */}
                    </li>
                  </div>
                )}
                {panel.secondSentence && (
                  <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                    <h3 className='lg:mb-8 mb-3 text-neon-chartreuse font-semibold lg:text-xl text-sm'>{panel.subTitle2}</h3>
                    <li className='flex justify-between items-center lg:text-md text-xs'>
                      {panel.secondSentence}
                      {/* <Link href='/services'>
                        <LuSquareArrowOutUpRight size={20} />
                      </Link> */}
                    </li>
                  </div>
                )}
                {panel.thirdSentence && (
                  <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                    <h3 className='lg:mb-8 mb-3 text-neon-chartreuse font-semibold lg:text-xl text-sm'>{panel.subTitle3}</h3>
                    <li className='flex justify-between items-center lg:text-md text-xs'>
                      {panel.thirdSentence}
                      {/* <Link href='/services'>
                        <LuSquareArrowOutUpRight size={20} />
                      </Link> */}
                    </li>
                  </div>
                )}
                {panel.fourthSentence && (
                  <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                    <h3 className='lg:mb-8 mb-3 text-neon-chartreuse font-semibold lg:text-xl text-sm'>{panel.subTitle4}</h3>
                    <li className='flex justify-between items-center lg:text-md text-xs'>
                      {panel.fourthSentence}
                      {/* <Link href='/services'>
                        <LuSquareArrowOutUpRight size={20} />
                      </Link> */}
                    </li>
                  </div>
                )}
              </ul>

            </div>
          </section>
        ))}
      </div>
    </section>
  )
}
