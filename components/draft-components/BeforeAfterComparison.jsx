"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BeforeAfterComparison() {
  const comparisonRef = useRef([]);

  useEffect(() => {
    const sections = comparisonRef.current;

    sections.forEach((section) => {
      if (!section) return;

      const afterImage = section.querySelector(".afterImage");
      const afterImg = afterImage?.querySelector("img");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: () => "+=" + section.offsetWidth,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "none" },
      });

      tl.fromTo(
        afterImage,
        { xPercent: 100, x: 0 },
        { xPercent: 0, x: 0 }
      ).fromTo(
        afterImg,
        { xPercent: -100, x: 0 },
        { xPercent: 0, x: 0 },
        0
      );
    });
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Intro Panel */}
      <section className="flex items-center justify-center min-h-[90vh]">
        <h4 className="text-2xl font-semibold">Scroll to see the before/after</h4>
      </section>

      {/* Comparison Section */}
      <section
        ref={(el) => {
          if (el && !comparisonRef.current.includes(el)) comparisonRef.current.push(el);
        }}
        className="relative w-full pb-[56.25%] comparisonSection"
      >
        {/* Before Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://assets.codepen.io/16327/before.jpg"
            alt="before"
            className="absolute top-0 w-full h-full object-cover"
          />
        </div>

        {/* After Image */}
        <div className="afterImage absolute inset-0 overflow-hidden">
          <img
            src="https://assets.codepen.io/16327/after.jpg"
            alt="after"
            className="absolute top-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Extra spacing for scroll */}
      <div className="h-[200vh]"></div>
    </div>
  );
}
