'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

export default function VerticalSections() {
  const sectionsRef = useRef([])

  useEffect(() => {
    const sections = sectionsRef.current

    sections.forEach((section) => {
      const large = section.querySelector('.large-child')

      gsap.to(large, {
        y: () => window.innerHeight - large.clientHeight - 16, // offset
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: 'top top',
          end: () => `+=${window.innerHeight * 4}`, // adjust scroll distance
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
    })
  }, [])

  return (
    <div className="w-full">
      
      {/* Vertical Sections */}
      {[
        {
          id: 'sectionOne',
          img: 'https://assets.codepen.io/16327/portrait-image-1.jpg',
          text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, id cupiditate eius, earum adipisci ab itaque ullam culpa minus dicta a? Harum impedit similique corrupti, magni ipsa tempore molestias minima eaque dolore ea. Sunt eveniet nisi facere doloribus commodi. Animi doloribus sunt optio autem, voluptatum iure fugit error saepe, sint neque nemo aliquid voluptates quibusdam aperiam distinctio asperiores blanditiis dolorum quis in! Reiciendis nihil repellat esse beatae laboriosam laborum quo est, fuga quis assumenda iusto? Amet facere suscipit commodi dolorum sit, nostrum fugiat quidem necessitatibus doloremque iusto repellendus minima assumenda soluta odio quam dignissimos. Nihil quisquam ut hic quam optio?`,
        },
        {
          id: 'sectionTwo',
          img: 'https://assets.codepen.io/16327/portrait-image-3.jpg',
          text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, id cupiditate eius, earum adipisci ab itaque ullam culpa minus dicta a? Harum impedit similique corrupti, magni ipsa tempore molestias minima eaque dolore ea. Sunt eveniet nisi facere doloribus commodi. Animi doloribus sunt optio autem, voluptatum iure fugit error saepe, sint neque nemo aliquid voluptates quibusdam aperiam distinctio asperiores blanditiis dolorum quis in! Reiciendis nihil repellat esse beatae laboriosam laborum quo est, fuga quis assumenda iusto? Amet facere suscipit commodi dolorum sit, nostrum fugiat quidem necessitatibus doloremque iusto repellendus minima assumenda soluta odio quam dignissimos. Nihil quisquam ut hic quam optio?`,
        },
        {
          id: 'sectionThree',
          img: 'https://assets.codepen.io/16327/portrait-image-4.jpg',
          text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, id cupiditate eius, earum adipisci ab itaque ullam culpa minus dicta a? Harum impedit similique corrupti, magni ipsa tempore molestias minima eaque dolore ea. Sunt eveniet nisi facere doloribus commodi. Animi doloribus sunt optio autem, voluptatum iure fugit error saepe, sint neque nemo aliquid voluptates quibusdam aperiam distinctio asperiores blanditiis dolorum quis in! Reiciendis nihil repellat esse beatae laboriosam laborum quo est, fuga quis assumenda iusto? Amet facere suscipit commodi dolorum sit, nostrum fugiat quidem necessitatibus doloremque iusto repellendus minima assumenda soluta odio quam dignissimos. Nihil quisquam ut hic quam optio?`,
        },
      ].map((section, i) => (
        <div
          key={i}
          ref={(el) => (sectionsRef.current[i] = el)}
          className="vertical-section w-full h-screen flex overflow-hidden text-lg"
        >
          {/* Left Panel */}
          <div className="w-1/2 h-screen flex flex-col justify-center items-center p-8">
            <img src={section.img} alt="" className="max-h-[80%] object-contain" />
          </div>

          {/* Right Panel */}
          <div className="w-1/2 p-8">
            <div className="large-child text-lg leading-7">
              {section.text.repeat(6)}
            </div>
          </div>
        </div>
      ))}

      {/* Outro Section */}

    </div>
  )
}
