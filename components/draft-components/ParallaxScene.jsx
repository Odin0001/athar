'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function ParallaxScene() {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-dist',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    tl.fromTo('.sky', { y: 0 }, { y: -200 }, 0)
      .fromTo('.cloud1', { y: 100 }, { y: -800 }, 0)
      .fromTo('.cloud2', { y: -150 }, { y: -500 }, 0)
      .fromTo('.cloud3', { y: -50 }, { y: -650 }, 0)
      .fromTo('.mountBg', { y: -10 }, { y: -100 }, 0)
      .fromTo('.mountMg', { y: -30 }, { y: -250 }, 0)
      .fromTo('.mountFg', { y: -50 }, { y: -600 }, 0);

    const arrowBtn = document.querySelector('#arrow-btn');

    arrowBtn.addEventListener('mouseenter', () => {
      gsap.to('.arrow', { y: 10, duration: 0.8, ease: 'back.inOut(3)', overwrite: 'auto' });
    });

    arrowBtn.addEventListener('mouseleave', () => {
      gsap.to('.arrow', { y: 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
    });

    arrowBtn.addEventListener('click', () => {
      gsap.to(window, { scrollTo: window.innerHeight, duration: 1.5, ease: 'power1.inOut' });
    });
  }, []);

  return (
    <>
      {/* Scroll distance */}
      <div className="scroll-dist h-[200vh] w-full" />

      <main className="fixed top-0 left-0 w-screen h-screen bg-white">
        <svg
          viewBox="0 0 1200 800"
          xmlns="http://www.w3.org/2000/svg"
          className="w-screen h-screen"
          preserveAspectRatio="xMidYMid slice"
        >
          <mask id="m">
            <g className="cloud1">
              <rect fill="#fff" width="100%" height="801" y="799" />
              <image
                href="https://assets.codepen.io/721952/cloud1Mask.jpg"
                width="100%"
                height="100%"
              />
            </g>
          </mask>

          <image className="sky" href="https://assets.codepen.io/721952/sky.jpg" width="100%" height="100%" />
          <image className="mountBg" href="https://assets.codepen.io/721952/mountBg.png" width="100%" height="100%" />
          <image className="mountMg" href="https://assets.codepen.io/721952/mountMg.png" width="100%" height="100%" />
          <image className="cloud2" href="https://assets.codepen.io/721952/cloud2.png" width="100%" height="100%" />
          <image className="mountFg" href="https://assets.codepen.io/721952/mountFg.png" width="100%" height="100%" />
          <image className="cloud1" href="https://assets.codepen.io/721952/cloud1.png" width="100%" height="100%" />
          <image className="cloud3" href="https://assets.codepen.io/721952/cloud3.png" width="100%" height="100%" />

          <text fill="#fff" x="350" y="200" className="text-[99px] font-extrabold font-montserrat">EXPLORE</text>
          <polyline className="arrow" fill="#fff" points="599,250 599,289 590,279 590,282 600,292 610,282 610,279 601,289 601,250" />

          <g mask="url(#m)">
            <rect fill="#fff" width="100%" height="100%" />
            <text x="350" y="200" fill="#162a43" className="text-[99px] font-extrabold font-montserrat">FURTHER</text>
          </g>

          <rect id="arrow-btn" width="100" height="100" x="550" y="220" className="cursor-pointer opacity-0" />
        </svg>
      </main>

    </>
  );
}
