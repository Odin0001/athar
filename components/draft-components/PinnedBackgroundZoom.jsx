'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger, EasePack } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, EasePack)

export default function PinnedBackgroundZoom() {
  useEffect(() => {
    const sections = gsap.utils.toArray('section')

    sections.forEach((section) => {
      const text = section.querySelector('p')
      const image = section.querySelector('.img')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          start: 'top top',
          end: 'bottom top',
        },
      })

      tl.from(text, { opacity: 0, y: 100 })
        .from(image, { scale: 0, ease: 'expoScale(0.01, 1, expo.out)', duration: 1 })
        .to(text, { opacity: 0, y: -100, ease: 'power1.in' })
    })

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }, [])

  return (
    <div className="overflow-hidden">
      {/* Header / Intro Section */}
      <div className="description panel border-b border-gray-700 text-center py-20">
        <div>
          <h1 className="text-5xl font-bold text-gray-100">Pinned Background Zoom</h1>
        </div>
        <div className="scroll-down mt-6 text-gray-300 flex flex-col items-center">
          <span>Scroll down</span>
          <div className="arrow mt-2 w-6 h-6 border-b-2 border-r-2 border-gray-400 rotate-45"></div>
        </div>
      </div>

      {/* Scroll Sections */}
      <div className="box-container">
        {/* Section 1 */}
        <section className="relative h-screen flex items-center justify-center text-center text-8xl font-bold text-white">
          <div
            className="img one absolute top-0 left-0 w-full h-full bg-cover bg-center -z-10"
            style={{ backgroundImage: 'url("https://assets.codepen.io/16327/portrait-pattern-2.jpg")' }}
          ></div>
          <p>1</p>
        </section>

        {/* Section 2 */}
        <section className="relative h-screen flex items-center justify-center text-center text-8xl font-bold text-white">
          <div
            className="img two absolute top-0 left-0 w-full h-full bg-cover bg-center -z-10"
            style={{ backgroundImage: 'url("https://assets.codepen.io/16327/portrait-pattern-3.jpg")' }}
          ></div>
          <p>2</p>
        </section>

        {/* Section 3 */}
        <section className="relative h-screen flex items-center justify-center text-center text-8xl font-bold text-white">
          <div
            className="img three absolute top-0 left-0 w-full h-full bg-cover bg-center -z-10"
            style={{ backgroundImage: 'url("https://assets.codepen.io/16327/portrait-pattern-4.jpg")' }}
          ></div>
          <p>3</p>
        </section>
      </div>
    </div>
  )
}
