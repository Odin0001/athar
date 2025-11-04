'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollBoxes() {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.trigger',
        scrub: 0.5,
        pin: true,
        start: 'top top',
        end: '+=150%',
      },
    });

    tl.to('.box', {
      force3D: true,
      duration: 1,
      xPercent: 100,
      ease: 'power1.inOut',
      stagger: { amount: 1 },
    })
      .to('.box', { ease: 'power1.out', duration: 1, rotation: 45 }, 0)
      .to('.box', { ease: 'power1.in', duration: 1, rotation: 0 }, 1);
  }, []);

  // Generate 80 boxes
  const boxes = Array.from({ length: 80 });

  return (
    <section className="trigger relative w-screen h-screen overflow-hidden bg-yellow-400">
      {/* Scroll Up/Down Text */}
      <span className="down absolute top-1/2 left-0 w-1/2 -translate-y-1/2 text-center text-5xl font-black uppercase text-gray-100">
        Scroll
        <br />
        Down
      </span>
      <span className="up absolute top-1/2 right-0 w-1/2 -translate-y-1/2 text-center text-5xl font-black uppercase text-gray-100">
        Scroll
        <br />
        Up
      </span>

      {/* Boxes */}
      {boxes.map((_, index) => (
        <div
          key={index}
          className="box h-[1.2vh] w-1/2 mb-[-0.2vh] bg-gray-900"
        ></div>
      ))}
    </section>
  );
}
