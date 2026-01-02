'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '@/components/LanguageProvider';
import Image from 'next/image';

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
    // Select all sentence elements within the slides
    const sentences = gsap.utils.toArray('.slide__sentence'); 

    const slideBackgroundImages = gsap.utils.toArray('.slide__bg-image');
    const outerWrappers = gsap.utils.toArray('.slide__outer');
    const innerWrappers = gsap.utils.toArray('.slide__inner');
    const wrap = gsap.utils.wrap(0, sections.length);
    let animating;
    let currentIndex = 0;

    // initialize positions
    gsap.set(outerWrappers, { xPercent: 100 });
    gsap.set(innerWrappers, { xPercent: -100 });
    gsap.set(sections[0], { autoAlpha: 1 });
    gsap.set('.slide:nth-of-type(1) .slide__outer', { xPercent: 0 });
    gsap.set('.slide:nth-of-type(1) .slide__inner', { xPercent: 0 });
    // Initialize sentences - show first, hide others
    gsap.set(sentences, { autoAlpha: 0 });
    if (sentences[0]) gsap.set(sentences[0], { autoAlpha: 1 });


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

      // Get current and next sentence elements
      const currentSentence = sentences[currentIndex];
      const nextSentence = sentences[index];

      // Update z-index and autoAlpha for sections
      gsap.set(sections, { zIndex: 0, autoAlpha: 0 });
      gsap.set(sections[currentIndex], { zIndex: 1, autoAlpha: 1 });
      gsap.set(sections[index], { zIndex: 2, autoAlpha: 1 });

      tl.fromTo(outerWrappers[index], { xPercent: 100 * direction }, { xPercent: 0 }, 0)
        .fromTo(innerWrappers[index], { xPercent: -100 * direction }, { xPercent: 0 }, 0)
        .to(heading, { '--width': 800, xPercent: 30 * direction }, 0)
        .fromTo(
          nextHeading,
          { '--width': 800, xPercent: -30 * direction },
          { '--width': 200, xPercent: 0 },
          0
        )
        // Slide background image scale (from the main section)
        .fromTo(slideBackgroundImages[index], { scale: 2 }, { scale: 1 }, 0);
        
      // Sentence animations
      // Outgoing sentence fades out and moves slightly
      if (currentSentence) {
        tl.to(
          currentSentence,
          { autoAlpha: 0, yPercent: -20 * direction }, // Move up/down slightly as it fades
          0 // Start at the same time as other major animations
        );
      }
      // Incoming sentence fades in and settles
      if (nextSentence) {
        tl.fromTo(
          nextSentence,
          { autoAlpha: 0, yPercent: 20 * direction }, // Start slightly off-center
          { autoAlpha: 1, yPercent: 0, duration: 0.8, ease: 'power2.out' }, // Settle at center
          0.2 // Start slightly after the other animations begin for a layered effect
        );
      }
      
      tl.timeScale(0.8);

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
      img: '/why-1.jpg',
      sentence: t('whyUs.firstSection.firstSentence'),
    },
    {
      heading: t('whyUs.firstSection.secondTitle'),
      img: '/why-2.jpg',
      sentence: t('whyUs.firstSection.secondSentence'),
    },
    {
      heading: t('whyUs.firstSection.thirdTitle'),
      img: '/why-3.jpg',
      sentence: t('whyUs.firstSection.thirdSentence'),
    },
    {
      heading: t('whyUs.firstSection.fourthTitle'),
      img: '/why-4.jpg',
      sentence: t('whyUs.firstSection.fourthSentence'),
    },
    {
      heading: t('whyUs.firstSection.fifthTitle'),
      img: '/why-5.jpg',
      sentence: t('whyUs.firstSection.fifthSentence'),
    },
    {
      heading: t('whyUs.firstSection.sixthTitle'),
      img: '/why-1.jpg',
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
              <div className="slide__content relative w-full h-full flex flex-col items-center justify-center">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full z-0">
                  <Image
                    src={slide.img}
                    alt={slide.heading}
                    fill
                    className="slide__bg-image object-cover"
                    sizes="100vw"
                    priority={i === 0}
                  />
                </div>
                
                {/* Content Layer */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-12">
                  <div className="flex items-center justify-center space-x-8 mb-8">
                    <span className="text-[clamp(3rem,4vw,15rem)] font-bold text-white border-b-[7px] border-white">
                      0{i + 1}
                    </span>
                    <h2 className="slide__heading text-center lg:text-9xl text-4xl font-bold text-white leading-none">
                      {slide.heading}
                    </h2>
                  </div>
                  {slide.sentence && (
                    <p className="slide__sentence text-white text-xl sm:text-2xl font-semibold text-center max-w-4xl">
                      {slide.sentence}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
