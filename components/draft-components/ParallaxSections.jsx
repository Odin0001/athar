'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSections() {
  useEffect(() => {
    const sections = gsap.utils.toArray('section');
    const lastIndex = sections.length - 1;

    sections.forEach((section, i) => {
      section._bg = section.querySelector('.bg');
      section._h1 = section.querySelector('h1');

      // Assign random background images
      section._bg.style.backgroundImage = `url(https://picsum.photos/${window.innerWidth}/${window.innerHeight * 2}?random=${i})`;

      ScrollTrigger.create({
        trigger: section,
        start: () => (i === 0 ? 'top top' : 'top bottom'),
        end: () => (i === lastIndex ? 'top top' : 'bottom top'),
        onRefresh: (self) => {
          section._tl = gsap
            .timeline({ paused: true, defaults: { ease: 'none', overwrite: 'auto' } })
            .fromTo(
              section._h1,
              { y: () => (i === 0 ? 0 : (window.innerHeight / 2) * 1.5) },
              { y: () => (i === lastIndex ? 0 : (-window.innerHeight / 2) * 1.5) },
              0
            )
            .fromTo(
              section._bg,
              { y: () => (i === 0 ? -window.innerHeight / 2 : 0) },
              { y: () => (i === lastIndex ? -window.innerHeight / 2 : -window.innerHeight) },
              0
            )
            .progress(self.progress);
        },
        onUpdate: (self) => {
          gsap.to(section._tl, { duration: 0.75, progress: self.progress });
        },
      });
    });
  }, []);

  return (
    <>
      {['Tweening parallax sections', 'Hey look, a title', 'They just keep coming', 'So smooth though', 'Nice, right?'].map((title, index) => (
        <section
          key={index}
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="bg absolute top-0 left-0 w-full h-[200%] -z-10 bg-cover bg-center bg-no-repeat" />
          <h1 className="text-white text-3xl font-normal drop-shadow-lg z-10 text-center px-4">
            {title}
          </h1>
        </section>
      ))}
    </>
  );
}
