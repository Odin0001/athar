
"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NameRotator() {
  useEffect(() => {
    gsap.set("li > span", { transformOrigin: "0 50%" });
    gsap.set("li:not(:first-of-type) span", { opacity: 0.2, scale: 0.8 });

    const tl = gsap.timeline()
      .to(
        "li:not(:first-of-type) span",
        { opacity: 1, scale: 1, stagger: 0.5 }
      )
      .to(
        "li:not(:last-of-type) span",
        { opacity: 0.2, scale: 0.8, stagger: 0.5 },
        0
      );

    ScrollTrigger.create({
      trigger: "h1",
      start: "center center",
      endTrigger: "li:last-of-type",
      end: "center center",
      pin: true,
      scrub: true,
      animation: tl,
      markers: false, // removed markers
    });
  }, []);

  return (
    <div className="snap-y snap-proximity overflow-y-scroll">
      {/* Top Spacer */}
      <div className="h-[80vh] flex items-center justify-center bg-blue-50 text-gray-800 text-4xl">
        Scroll Down
      </div>

      {/* Rotator Section */}
      <div className="flex flex-row items-start pl-5 space-x-6 snap-center">
        <h1 className="flex-shrink-0 text-[clamp(30px,8vw,60px)] uppercase font-extrabold tracking-widest">
          hello
        </h1>
        <ul className="list-none p-0 m-0 flex flex-col space-y-0">
          {[
            "Akapowl", "Jack", "Cassie", "Rodrigo", "Shaun", "Mitchel",
            "Craig", "SHRUG", "Carl", "Jonathan", "Sahil", "Zach",
            "Blake", "Diaco", "DIPSCOM"
          ].map((name, idx) => (
            <li key={idx} className="snap-center">
              <span className="inline-block text-[clamp(30px,8vw,60px)] uppercase font-extrabold tracking-widest">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Spacer */}
      <div className="h-[80vh] mt-20 flex items-center justify-center bg-blue-50 text-gray-800 text-4xl">
        The Bottom
      </div>

      {/* Brand Section */}
      <div className="bg-black text-center py-10">
        <a
          href="https://www.creativecodingclub.com/bundles/creative-coding-club?src=scrollsnapcdpn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://assets.codepen.io/32887/logo-ill.svg"
            alt="Creative Coding Club"
            className="mx-auto w-72"
          />
        </a>
      </div>
    </div>
  );
}