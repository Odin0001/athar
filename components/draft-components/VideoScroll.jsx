'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function VideoScroll() {
  const videoRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const wrapper = wrapperRef.current
    if (!video || !wrapper) return

    // Timeline to animate video currentTime
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true, // pins the section while scrolling
      },
    })

    video.onloadedmetadata = () => {
      tl.to(video, {
        currentTime: video.duration,
        ease: 'none',
      })
    }

    // Touch device handling
    const isTouchDevice = () =>
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0

    if (isTouchDevice()) {
      video.play()
      video.pause()
    }
  }, [])

  return (
    <div className="w-full">
      {/* Video section */}
      <section ref={wrapperRef} className="relative w-full h-screen overflow-hidden">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          playsInline
          webkit-playsinline="true"
          preload="auto"
          muted
        >
          <source
            src="https://www.dropbox.com/scl/fi/qejf5dgqiv6m77d71r2ec/abstract-background-ink-water.mp4?rlkey=cf5xf73grwr5olszcyjghc5pt&st=ycgfiqec&raw=1"
            type="video/mp4"
          />
        </video>
      </section>

      {/* Content after video */}
      {/* <section className="w-full min-h-screen bg-gray-100 flex flex-col justify-center items-center p-8">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">
          Scrollable Content Section
        </h2>
        <p className="text-lg max-w-2xl text-gray-700">
          Now you can scroll past the pinned video naturally. The video is
          pinned while its currentTime animates with scroll, and after it's
          done, the user continues scrolling into this section.
        </p>
      </section> */}
    </div>
  )
}