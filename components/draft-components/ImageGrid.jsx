'use client'

import { useEffect } from 'react'
import gsap from 'gsap'


export default function ImageGrid() {

  useEffect(() => {
    // Apply GSAP effects to images through the global smoother
    const smoother = gsap.utils.toArray('img').length && gsap.globalTimeline.getChildren()
    // You can still control effects per image here if needed
  }, [])

  return (
    <section id="content">
      {/* Image Grid */}
      <section
        className="
          grid grid-cols-12 gap-x-4 gap-y-[33vh] w-screen mx-auto
          max-w-[2500px]
        "
      >
        {/* 1 */}
        <picture className="relative overflow-hidden h-[95vh] col-span-12">
          <source
            srcSet="https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=srgb&fm=jpg&q=85&w=1500"
            media="(min-width: 1500px)"
          />
          <source
            srcSet="https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000"
            media="(min-width: 700px)"
          />
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=srgb&fm=jpg&q=85&w=600"
            className="absolute w-full h-[160%] object-cover bottom-0"
            alt=""
          />
        </picture>

        {/* 2 */}
        <div
          className="
            relative overflow-hidden h-[60vh]
            col-start-2 col-span-8
            md:col-start-2 md:col-span-4
          "
        >
          <img
            src="https://images.unsplash.com/photo-1569596082827-c5e8990496cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500"
            alt=""
            className="absolute w-full h-[160%] object-cover bottom-0"
          />
        </div>

        {/* 3 */}
        <div
          className="
            relative overflow-hidden h-[60vh]
            col-start-4 col-span-8
            md:col-start-8 md:col-span-4
          "
        >
          <img
            src="https://images.unsplash.com/photo-1587932775991-708a20af2cc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500"
            alt=""
            className="absolute w-full h-[160%] object-cover bottom-0 object-right"
          />
        </div>

        {/* 4 */}
        <div
          className="
            relative overflow-hidden h-[60vh]
            col-span-12
          "
        >
          <img
            src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"
            alt=""
            className="absolute w-full h-[160%] object-cover bottom-0"
          />
        </div>

        {/* 5 */}
        <div
          className="
            relative overflow-hidden h-[80vh]
            col-start-4 col-span-8
            md:col-start-8 md:col-span-4
          "
        >
          <img
            src="https://images.unsplash.com/photo-1623166200209-6bd48520d6cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500"
            alt=""
            className="absolute w-full h-[160%] object-cover bottom-0"
          />
        </div>

        {/* 6 */}
        <div
          className="
            relative overflow-hidden h-[80vh]
            col-start-2 col-span-8
            md:col-start-2 md:col-span-4
          "
        >
          <img
            src="https://images.unsplash.com/photo-1532587459811-f057563d1936?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500"
            alt=""
            className="absolute w-full h-[160%] object-cover bottom-0"
          />
        </div>
      </section>

      <div className="h-screen"></div>
    </section>
  )
}
