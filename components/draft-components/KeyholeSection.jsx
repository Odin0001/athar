"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function KeyholeSection() {
  const keyholeRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const isAnimationOk = window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    ).matches;
    const scrub = true;

    if (!isAnimationOk) return;

    // Keyhole clip-path animation
    gsap.fromTo(
      keyholeRef.current,
      {
        clipPath:
          "polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)",
      },
      {
        clipPath:
          "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 100% 100%, 100% 0%)",
        scrollTrigger: {
          trigger: ".section--primary",
          start: "top top",
          end: "bottom bottom",
          scrub: scrub,
        },
      }
    );

    // Arrow fade out
    gsap.to(arrowRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: ".section--primary",
        start: "top top",
        end: "+=200",
        scrub: scrub,
      },
    });
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Keyhole overlay */}
      <span
        ref={keyholeRef}
        className="fixed inset-0 pointer-events-none bg-yellow-400 z-10"
        aria-hidden="true"
      ></span>

      <main className="relative z-0">
        {/* Primary Section */}
        <section className="section--primary bg-yellow-200 relative min-h-screen flex flex-col items-center justify-center">
          <figure className="w-full h-full">
            <img
              src="https://picsum.photos/id/315/1600/1600"
              alt=""
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <h1 className="text-5xl font-serif mb-4 text-gray-800">
              At vero eos et accusamus.
            </h1>
            <p className="max-w-xl text-gray-800">
              Cupiditate non provident, similique sunt in culpa qui officia
              deserunt mollitia.
            </p>
          </div>
        </section>

        {/* Secondary Section */}
        {/* <section className="section--secondary bg-purple-300 min-h-screen flex items-center justify-center">
          <div className="max-w-3xl p-8 text-center">
            <h2 className="text-4xl font-serif mb-4">At vero eos et accusamus.</h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium.
            </p>
          </div>
        </section> */}

        {/* Tertiary Section */}
        {/* <section className="section--tertiary bg-pink-300 min-h-screen flex items-center justify-center">
          <div className="max-w-3xl p-8 text-center">
            <h2 className="text-4xl font-serif mb-4">
              Qui officia deserunt mollit anim id est laborum.
            </h2>
            <p>
              Et harum quidem rerum facilis est et expedita distinctio...
            </p>
          </div>
        </section> */}
      </main>
    </div>
  );
}
