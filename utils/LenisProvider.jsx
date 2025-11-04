"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";

export default function LenisProvider({ children }) {
  const lenisRef = useRef();

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    // optional: log scroll speed for debugging
    // lenis.on('scroll', (e) => console.log(e))

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        // core feel — equivalent to ScrollSmoother smooth: 2–3
        duration: 1.5,      // lower = faster scroll, higher = smoother
        easing: (t) => 1 - Math.pow(1 - t, 2.5), // smooth ease-out
        smoothWheel: true,  // enables inertia for mouse wheel
        smoothTouch: false, // disable for mobile natural scroll
        lerp: 0.1,          // small lerp for added smoothness (0–1)
      }}
    >
      {children}
    </ReactLenis>
  );
}
