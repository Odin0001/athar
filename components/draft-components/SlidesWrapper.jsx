'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

export default function SlidesWrapper() {
  useEffect(() => {
    const panels = gsap.utils.toArray('.section')
    panels.pop() // remove last section from pin logic

    panels.forEach((panel) => {
      const innerpanel = panel.querySelector('.section-inner')
      const panelHeight = innerpanel.offsetHeight
      const windowHeight = window.innerHeight
      const difference = panelHeight - windowHeight
      const fakeScrollRatio = difference > 0 ? difference / (difference + windowHeight) : 0

      if (fakeScrollRatio) {
        panel.style.marginBottom = panelHeight * fakeScrollRatio + 'px'
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: 'bottom bottom',
          end: () => (fakeScrollRatio ? `+=${innerpanel.offsetHeight}` : 'bottom top'),
          pinSpacing: false,
          pin: true,
          scrub: true,
        },
      })

      if (fakeScrollRatio) {
        tl.to(innerpanel, {
          yPercent: -100,
          y: window.innerHeight,
          duration: 1 / (1 - fakeScrollRatio) - 1,
          ease: 'none',
        })
      }

      tl.fromTo(panel, { scale: 1, opacity: 1 }, { scale: 0.5, opacity: 0.5, duration: 0.9 })
        .to(panel, { opacity: 0, duration: 0.1 })
    })

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }, [])

  return (
    <div className="w-full overflow-x-hidden overflow-y-scroll mt-16">
      <div className="slides-wrapper">
        {/* Section 1 */}
        <section className="section bg-white text-black relative flex justify-center items-center h-screen rounded-lg overflow-hidden font-semibold text-center text-2xl">
          <div className="section-content flex flex-col items-center justify-center w-full h-full">
            <div className="section-inner h-full flex flex-col items-center justify-center">
              <h1 className="text-[8vw] font-bold m-auto pt-6">Section 1</h1>
              <img
                className="image w-1/2 aspect-square object-cover mt-10 rounded-lg"
                src="https://assets.codepen.io/16327/portrait-image-9.jpg"
                alt=""
              />
            </div>
          </div>
        </section>

        {/* Section 2 (Long scrollable section) */}
        <section className="section bg-pink-200 text-black relative flex justify-center items-center h-screen rounded-lg overflow-hidden font-semibold text-center text-2xl">
          <div className="section-content flex flex-col items-center justify-start w-full h-full">
            <div className="section-inner h-auto pb-[20vh] overflow-visible px-6 md:px-20 lg:px-40">
              <h1 className="text-[8vw] font-bold mt-10 mb-10">Section 2</h1>
              {Array.from({ length: 35 }).map((_, i) => (
                <p key={i} className="text-lg mb-4 text-gray-800">
                  This section is supposed to be long and scrollable within before the next slide comes in.
                </p>
              ))}
              <p className="text-lg font-bold text-gray-900">This is the end...</p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="section bg-gray-200 text-black relative flex justify-center items-center h-screen rounded-lg overflow-hidden font-semibold text-center text-2xl">
          <div className="section-content flex flex-col items-center justify-center w-full h-full">
            <div className="section-inner h-full flex flex-col items-center justify-center">
              <h1 className="text-[8vw] font-bold m-auto pt-16">Section 3</h1>
              <img
                className="image w-2/5 aspect-square object-cover mt-10 rounded-lg"
                src="https://assets.codepen.io/16327/portrait-image-3.jpg"
                alt=""
              />
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="section bg-purple-400 text-black relative flex justify-center items-center h-screen rounded-lg overflow-hidden font-semibold text-center text-2xl">
          <div className="section-content flex flex-col items-center justify-center w-full h-full">
            <div className="section-inner h-full flex flex-col items-center justify-center">
              <h1 className="text-[8vw] font-bold m-auto pt-16">Section 4</h1>
              <img
                className="image w-2/5 aspect-square object-cover mt-10 rounded-lg"
                src="https://assets.codepen.io/16327/portrait-image-2.jpg"
                alt=""
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
