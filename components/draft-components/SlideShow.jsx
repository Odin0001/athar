'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '@/components/LanguageProvider'

gsap.registerPlugin(Observer, ScrollTrigger);

export default function SlideShow() {

  const { t } = useTranslation()

  // Lock scroll and viewport height
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyHeight = document.body.style.height;

    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.height = originalBodyHeight;
    };
  }, []);

  useEffect(() => {
    const sections = gsap.utils.toArray('.slide');
    const images = gsap.utils.toArray('.image').reverse(); // This is the <img> element
    const imageSlides = gsap.utils.toArray('.image-slide').reverse(); // This is the <div> wrapper
    // 💡 NEW: Select all sentence elements within the image-slides
    const sentences = gsap.utils.toArray('.image-slide p').reverse(); 

    const slideImages = gsap.utils.toArray('.slide__img');
    const outerWrappers = gsap.utils.toArray('.slide__outer');
    const innerWrappers = gsap.utils.toArray('.slide__inner');
    const count = document.querySelector('.count');
    const wrap = gsap.utils.wrap(0, sections.length);
    let animating;
    let currentIndex = 0;

    // initialize positions
    gsap.set(outerWrappers, { xPercent: 100 });
    gsap.set(innerWrappers, { xPercent: -100 });
    gsap.set(sections[0], { autoAlpha: 1 });
    gsap.set('.slide:nth-of-type(1) .slide__outer', { xPercent: 0 });
    gsap.set('.slide:nth-of-type(1) .slide__inner', { xPercent: 0 });
    // 💡 NEW: Initially set all image-slide containers (and thus their sentences) to hidden except the first
    gsap.set(imageSlides, { autoAlpha: 0, zIndex: 0 });
    gsap.set(imageSlides[0], { autoAlpha: 1, zIndex: 1 });


    function gotoSection(index, direction) {
      animating = true;
      index = wrap(index);

      const tl = gsap.timeline({
        defaults: { duration: 1, ease: 'expo.inOut' },
        onComplete: () => (animating = false),
      });

      const currentSection = sections[currentIndex];
      const heading = currentSection.querySelector('.slide__heading');
      const nextSection = sections[index];
      const nextHeading = nextSection.querySelector('.slide__heading');

      // 💡 NEW: Get current and next sentence elements
      const currentSentence = sentences[currentIndex];
      const nextSentence = sentences[index];

      // Update z-index and autoAlpha for sections and image-slide containers
      gsap.set([sections, imageSlides], { zIndex: 0, autoAlpha: 0 });
      gsap.set([sections[currentIndex], imageSlides[index]], { zIndex: 1, autoAlpha: 1 });
      gsap.set([sections[index], imageSlides[currentIndex]], { zIndex: 2, autoAlpha: 1 });

      tl.set(count, { textContent: index + 1 }, 0.32)
        .fromTo(outerWrappers[index], { xPercent: 100 * direction }, { xPercent: 0 }, 0)
        .fromTo(innerWrappers[index], { xPercent: -100 * direction }, { xPercent: 0 }, 0)
        .to(heading, { '--width': 800, xPercent: 30 * direction }, 0)
        .fromTo(
          nextHeading,
          { '--width': 800, xPercent: -30 * direction },
          { '--width': 200, xPercent: 0 },
          0
        )
        // Image transformations
        .fromTo(
          images[index],
          { xPercent: 125 * direction, scaleX: 1.5, scaleY: 1.3 },
          { xPercent: 0, scaleX: 1, scaleY: 1, duration: 1 },
          0
        )
        .fromTo(
          images[currentIndex],
          { xPercent: 0, scaleX: 1, scaleY: 1 },
          { xPercent: -125 * direction, scaleX: 1.5, scaleY: 1.3 },
          0
        )
        // Slide image scale (from the main section)
        .fromTo(slideImages[index], { scale: 2 }, { scale: 1 }, 0)
        
        // 💡 NEW: Sentence animations
        // Outgoing sentence fades out and moves slightly
        .to(
            currentSentence,
            { autoAlpha: 0, yPercent: -50 - (20 * direction) }, // Move up/down slightly as it fades
            0 // Start at the same time as other major animations
        )
        // Incoming sentence fades in and settles
        .fromTo(
            nextSentence,
            { autoAlpha: 0, yPercent: -50 + (20 * direction) }, // Start slightly off-center
            { autoAlpha: 1, yPercent: -50, duration: 0.8, ease: 'power2.out' }, // Settle at center
            0.2 // Start slightly after the other animations begin for a layered effect
        )
        .timeScale(0.8);

      currentIndex = index;
    }

    // ... Observer and Keydown listeners (keep as is) ...
    Observer.create({
      type: 'wheel,touch,pointer',
      preventDefault: true,
      wheelSpeed: -1,
      onUp: () => {
        if (animating) return;
        gotoSection(currentIndex + 1, +1);
      },
      onDown: () => {
        if (animating) return;
        gotoSection(currentIndex - 1, -1);
      },
      tolerance: 10,
    });

    document.addEventListener('keydown', (e) => {
      if ((e.code === 'ArrowUp' || e.code === 'ArrowLeft') && !animating) {
        gotoSection(currentIndex - 1, -1);
      }
      if (
        (e.code === 'ArrowDown' ||
          e.code === 'ArrowRight' ||
          e.code === 'Space' ||
          e.code === 'Enter') &&
        !animating
      ) {
        gotoSection(currentIndex + 1, 1);
      }
    });
  }, []);

  const slideData = [
    {
      heading: t('whyUs.firstSection.firstTitle'),
      bg: '#6d597a',
      img: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=1200&q=80',
    },
    {
      heading: t('whyUs.firstSection.secondTitle'),
      bg: '#355070',
      img: 'https://images.unsplash.com/photo-1558603668-6570496b66f8?auto=format&fit=crop&w=1200&q=80',
    },
    {
      heading: t('whyUs.firstSection.thirdTitle'),
      bg: '#b56576',
      img: 'https://images.unsplash.com/photo-1537165924986-cc3568f5d454?auto=format&fit=crop&w=1200&q=80',
    },
    {
      heading: t('whyUs.firstSection.fourthTitle'),
      bg: '#9a8c98',
      img: 'https://images.unsplash.com/photo-1589271243958-d61e12b61b97?auto=format&fit=crop&w=1200&q=80',
    },
    {
      heading: t('whyUs.firstSection.fifthTitle'),
      bg: '#6d597a',
      img: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=1200&q=80',
    },
    {
      heading: t('whyUs.firstSection.sixthTitle'),
      bg: '#355070',
      img: 'https://images.unsplash.com/photo-1558603668-6570496b66f8?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const overlayImages = [
    {
      image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
      sentence: t('whyUs.firstSection.firstSentence'),
    },
    {
      image: 'https://images.unsplash.com/photo-1594666757003-3ee20de41568',
      sentence: t('whyUs.firstSection.secondSentence'),
    },
    {
      image: 'https://images.unsplash.com/photo-1579830341096-05f2f31b8259',
      sentence: t('whyUs.firstSection.thirdSentence'),
    },
    {
      image: 'https://images.unsplash.com/photo-1603771628302-c32c88e568e3',
      sentence: t('whyUs.firstSection.fourthSentence'),
    },
    {
      image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
      sentence: t('whyUs.firstSection.fifthSentence'),
    },
    {
      image: 'https://images.unsplash.com/photo-1594666757003-3ee20de41568',
      sentence: t('whyUs.firstSection.sixthSentence'),
    },
    
  ];

  return (
    <div className="fixed inset-0 z-[98] overflow-hidden font-sora text-white">
      {/* Slides */}
      {slideData.map((slide, i) => (
        <section
          key={i}
          className={`slide fixed inset-0 w-full h-full flex items-center justify-center ${
            i === 0 ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          <div className="slide__outer w-full h-full overflow-hidden">
            <div className="slide__inner w-full h-full overflow-hidden">
              <div
                className="slide__content absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center"
                style={{ backgroundColor: slide.bg }}
              >
                <div className="slide__container relative w-full grid grid-cols-10 grid-rows-10 h-[50vh] mb-[20vh] px-4 sm:px-12">
                  <h2 className="slide__heading col-span-10 row-span-10 flex items-center justify-center text-center text-9xl font-bold text-[#f2f1fc] mix-blend-difference  leading-none">
                    {slide.heading}
                  </h2>
                  <figure className="col-span-7 row-span-6 mt-36">
                    <img
                      className="slide__img w-full h-full object-cover"
                      src={slide.img}
                      alt={slide.heading}
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Overlay */}
      <section className="overlay fixed inset-0 z-20">
        <div className="overlay__content relative w-full max-w-[1400px] mx-auto grid grid-cols-10 grid-rows-10 gap-0 h-[90vh] mb-[10vh] px-4 sm:px-12">
          <p className="overlay__count text-right text-[clamp(3rem,4vw,15rem)] border-b-[7px] border-white row-start-3 col-start-10">
            0<span className="count">1</span>
          </p>
          <figure className="overlay__img-cont relative overflow-hidden row-start-4 col-start-3 row-end-9 col-end-11">
            {overlayImages.map((item, idx) => (
              <div
                key={idx}
                // Add an image-slide class to target it with GSAP
                className="image-slide absolute w-full h-full top-0 left-0" 
                // Initially hide all but the first image-slide container
                style={{ visibility: idx === 0 ? 'visible' : 'hidden' }}
              >
                <img
                  // Keep the 'image' class for GSAP to target the image element for transformations
                  className="image absolute w-full h-full object-cover" 
                  src={`${item.image}?auto=format&fit=crop&w=1200&q=80`}
                  alt={`slide ${idx}`}
                />
                <p 
                  // Place the sentence over the image
                  className={`absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-800 w-full text-center p-4 text-xl font-semibold bg-white bg-opacity-70`}
                >
                  {item.sentence}
                </p>
              </div>
            ))}
          </figure>
        </div>
      </section>
    </div>
  );
}
