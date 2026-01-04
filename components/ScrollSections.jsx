'use client';
import { useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
// NOTE: useGSAP is not used in the final version, but kept for completeness if you decide to use it.
import { useTranslation } from '@/components/LanguageProvider'
import { Observer } from 'gsap/Observer';
import { usePathname } from 'next/navigation';
import about1 from '@/public/about1.png'
import about2 from '@/public/about2.png'
import about3 from '@/public/about3.png'
import Image from 'next/image';

const ScrollSections = () => {
  const { t, lang } = useTranslation()
  const pathname = usePathname();
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const outerRefs = useRef([]);
  const innerRefs = useRef([]);
  const imageRefs = useRef([]);
  const headingRefs = useRef([]);
  const currentIndexRef = useRef(-1);
  const animatingRef = useRef(false);
  const observerRef = useRef(null);


  const sectionData = [
  { 
    id: 0, 
    // text: (
    //         <div className='flex flex-col items-start gap-4'>
    //           <h1 className='text-4xl sm:text-6xl md:text-8xl lg:text-[10rem]'>{t('about.firstSection.title')}</h1>
    //           <p className='text-xl sm:text-2xl md:text-4xl'>{t('about.firstSection.firstSentence')}</p>
    //           <p className='text-xl sm:text-2xl md:text-4xl'>{t('about.firstSection.secondSentence')}</p>
    //         </div>
    //       ), 
    title: t('about.firstSection.title'),
    firstSentence: t('about.firstSection.firstSentence'),
    secondSentence: t('about.firstSection.secondSentence'),
    bg: "mint-leaf",
    img: about1
  },
  { 
    id: 1, 
    // text: (
    //         <div className='flex flex-col items-start gap-4'>
    //           <h1 className='text-4xl sm:text-6xl md:text-8xl lg:text-[10rem]'>{t('about.secondSection.title')}</h1>
    //           <p className='text-xl sm:text-2xl md:text-4xl'>{t('about.secondSection.firstSentence')}</p>
    //         </div>
    //       ), 
    title: t('about.secondSection.title'),
    firstSentence: t('about.secondSection.firstSentence'),
    bg: "white",
    img: about2
  },
  { 
    id: 2, 
    // text: (
    //         <div className='flex flex-col items-start gap-4'>
    //           <h1 className='text-4xl sm:text-6xl md:text-8xl lg:text-[10rem]'>{t('about.thirdSection.title')}</h1>
    //           <p className='text-xl sm:text-2xl md:text-4xl'>{t('about.thirdSection.firstSentence')}</p>
    //           <p className='text-xl sm:text-2xl md:text-4xl'>{t('about.thirdSection.secondSentence')}</p>
    //           <p className='text-xl sm:text-2xl md:text-4xl'>{t('about.thirdSection.thirdSentence')}</p>
    //         </div>
    //       ), 
    title: t('about.thirdSection.title'),
    firstSentence: t('about.thirdSection.firstSentence'),
    secondSentence: t('about.thirdSection.secondSentence'),
    thirdSentence: t('about.thirdSection.thirdSentence'),
    bg: "strawberry-red",
    img: about3
  },

];

  // Removed the 'wrap' function as it caused the infinite loop.

  // const splitText = (text) => {
  //   return text.split(' ').map((word, wIdx) => (
  //     <div key={wIdx} className="inline-block overflow-hidden section-word">
  //       {word.split('').map((char, cIdx) => (
  //         <span key={cIdx} className="char inline-block will-change-transform">
  //           {char === ' ' ? '\u00A0' : char}
  //         </span>
  //       ))}
  //       <span className="char inline-block w-[0.5em] will-change-transform">&nbsp;</span>
  //     </div>
  //   ));
  // };

  /**
   * Modified gotoSection:
   * - Checks for array bounds (0 and len-1).
   * - Returns false if the index is out of bounds, allowing the Observer to skip preventDefault.
   */
  const gotoSection = useCallback((index, direction) => {
    const len = sectionData.length;
    
    // Boundary check: If the new index is out of range, stop and return false.
    if (index < 0 || index >= len) {
      return false; // Signal that we've reached an edge
    }
    
    // If an animation is already running, prevent new action but signal the Observer to stay active.
    if (animatingRef.current) return true; 

    animatingRef.current = true;
    const fromTop = direction === -1;
    const dFactor = fromTop ? -1 : 1;
    const currentIndex = currentIndexRef.current;

    const tl = gsap.timeline({
      defaults: { duration: 1.25, ease: "power1.inOut" },
      onComplete: () => { animatingRef.current = false; }
    });

    if (currentIndex >= 0) {
      gsap.set(sectionRefs.current[currentIndex], { zIndex: 0 });
      tl.to(imageRefs.current[currentIndex], { yPercent: -15 * dFactor })
        .set(sectionRefs.current[currentIndex], { autoAlpha: 0 });
    }

    gsap.set(sectionRefs.current[index], { autoAlpha: 1, zIndex: 1 });

    tl.fromTo([outerRefs.current[index], innerRefs.current[index]],
      { yPercent: i => i === 0 ? 100 * dFactor : -100 * dFactor },
      { yPercent: 0 },
      0
    ).fromTo(imageRefs.current[index],
      { yPercent: 15 * dFactor },
      { yPercent: 0 },
      0
    );

    const currentHeadingRef = headingRefs.current[index];
    const newHeadingChars = currentHeadingRef ? currentHeadingRef.querySelectorAll('.char') : [];

    tl.fromTo(newHeadingChars,
      { autoAlpha: 0, yPercent: 150 * dFactor },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 1,
        ease: "power2",
        stagger: { each: 0.02, from: "random" }
      },
      0.2
    );

    currentIndexRef.current = index;
    return true; // Signal that an animation was initiated
  }, []);

// ------------------------------------------------------------------

  /**
   * Main GSAP setup (reruns when pathname changes)
   * The Observer logic is modified to only prevent default scroll on valid section changes.
   */
  useEffect(() => {
    gsap.registerPlugin(Observer);

    if (observerRef.current) {
      observerRef.current.kill();
      observerRef.current = null;
    }

    const filteredOuter = outerRefs.current.filter(Boolean);
    const filteredInner = innerRefs.current.filter(Boolean);
    const filteredSections = sectionRefs.current.filter(Boolean);

    gsap.set(filteredOuter, { yPercent: 100 });
    gsap.set(filteredInner, { yPercent: -100 });
    filteredSections.forEach((section, index) => {
      gsap.set(section, { autoAlpha: index === 0 ? 1 : 0 });
    });

    const timeout = requestAnimationFrame(() => {
      currentIndexRef.current = -1;
      gotoSection(0, 1);

      observerRef.current = Observer.create({
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        // Removed preventDefault: true to allow conditional logic below
        target: containerRef.current,
        tolerance: 10,
        
        onDown: (self) => {
          const didAnimate = gotoSection(currentIndexRef.current - 1, -1);
          if (didAnimate) {
            self.event.preventDefault(); // Prevents page scroll when animating
            self.event.stopPropagation();
          }
        },
        onUp: (self) => {
          const didAnimate = gotoSection(currentIndexRef.current + 1, 1);
          if (didAnimate) {
            self.event.preventDefault(); // Prevents page scroll when animating
            self.event.stopPropagation();
          }
        },
      });
    });

    return () => {
      cancelAnimationFrame(timeout);
      observerRef.current?.kill();
      observerRef.current = null;
    };
  }, [pathname, gotoSection]);

// ------------------------------------------------------------------

  /**
   * Body scroll lock is still applied here to ensure the fixed sections
   * are the only scrollable content in the viewport.
   */
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;

    // Apply lock
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';

    // Cleanup: restore original body styles
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
    };
  }, []);

// ------------------------------------------------------------------

  return (
    <div ref={containerRef}>
      <style>{`
        .bg-gradient-overlay {
          background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1));
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          z-index: 10;
        }
        .section-word { display: inline-block; overflow: hidden; }
      `}</style>

      {sectionData.map((data, index) => (
        <section
          key={data.id}
          ref={el => sectionRefs.current[index] = el}
          className="h-screen w-screen top-0 left-0 fixed"
        >
          <div ref={el => outerRefs.current[index] = el} className="outer w-full h-full overflow-hidden">
            <div ref={el => innerRefs.current[index] = el} className="inner w-full h-full overflow-hidden">
              <div
                ref={el => imageRefs.current[index] = el}
                className={`bg-${data.bg} absolute h-full w-full top-0 flex items-center justify-center`}
                // style={{
                //   backgroundImage: `url(${data.url})`,
                //   backgroundSize: 'cover',
                //   backgroundPosition: 'center'
                // }}
              >
                <div className="bg-gradient-overlay"></div>
                <div
                  ref={el => headingRefs.current[index] = el}
                  className={`section-heading w-full h-full flex ${lang === 'ar' ? 'lg:flex-row-reverse text-right' : 'lg:flex-row'} flex-col lg:justify-between justify-start items-center gap-10 px-10 pt-20 text-white z-20 font-semibold w-[90vw] leading-none`}
                >
                  {/* {data.text} */}
                    <div className='lg:max-w-1/2 leading-6'>
                      <h1 className='text-2xl sm:text-3xl md:text-5xl lg:text-6xl lg:mb-10 mb-4'>{data.title}</h1>
                      <p className='text-xs sm:text-lg md:text-xl mb-6'>{data.firstSentence}</p>
                      {data.secondSentence && <p className='text-xs sm:text-lg md:text-xl mb-6'>{data.secondSentence}</p>}
                      {data.thirdSentence && <p className='text-xs sm:text-lg md:text-xl'>{data.thirdSentence}</p>}
                    </div>
                    <Image src={data.img} alt={`slide number ${index + 1}`} width={700} sizes='700px' className='max-w-[700px] lg:w-[500px] w-[150px]' />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ScrollSections;