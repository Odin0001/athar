'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function HeroScroll() {
  useEffect(() => {
    // Create smooth scroller
    const smoother = ScrollSmoother.create({
      wrapper: '#wrapper',
      content: '#content',
      smooth: 2,
      speed: 3,
      effects: true,
    });

    // Random parallax speed per column
    smoother.effects('.hero__image-cont', {
      speed: () => gsap.utils.random(0.55, 0.85, 0.05),
    });

    // Animate swipe overlay
    gsap.to('.anim-swipe', {
      yPercent: 300,
      delay: 0.2,
      duration: 3,
      stagger: {
        from: 'random',
        each: 0.1,
      },
      ease: 'sine.out',
    });

    // Animate image scaling & movement
    gsap.to('.hero__image-cont > img', {
      scale: 1.5,
      xPercent: 20,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '+=3000px',
        scrub: true,
      },
    });
  }, []);

  return (
    <div id="wrapper" className="overflow-hidden bg-[#111]">
      <div id="content">
        <section className="hero h-screen">
          <div className="hero__inner grid h-full grid-cols-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="hero__image-cont relative overflow-hidden border-r border-[#111] last:border-none"
              >
                <img
                  src="https://assets.codepen.io/756881/dawid-zawila-TN8inGqMH7k-unsplash.jpg"
                  alt="Hero"
                  className={`absolute top-0 h-full w-[700%] object-cover left-[-${
                    (i + 1) * 100
                  }%]`}
                />
                <div className="anim-swipe absolute top-0 left-0 h-full w-full bg-[#111]" />
              </div>
            ))}
          </div>
        </section>

        <section className="spacer h-[300vh]" />
      </div>

      <img
        className="scroll fixed bottom-4 left-1/2 -translate-x-1/2 z-[999] w-12 h-12"
        src="https://img.icons8.com/glyph-neue/128/ffffff/circled-down-2.png"
        alt="scroll down"
        loading="lazy"
      />
    </div>
  );
}
