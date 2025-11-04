'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default function ScrollSmootherProvider({ children }) {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    // Prevent duplicate smoothers during HMR or navigation
    if (ScrollSmoother.get()) ScrollSmoother.get().kill()

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 2.5,
      effects: true,
    })

    smoother.effects('img', { speed: 'auto' })

    return () => smoother.kill()
  }, [])

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  )
}
