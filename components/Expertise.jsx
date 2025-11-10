// components/Expertise.jsx
"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from '@/components/LanguageProvider'

gsap.registerPlugin(ScrollTrigger);

// Define the fixed height of the final pinned title/number bar
const PINNED_HEIGHT_PX = 100;



const Expertise = () => {
  
  const { t } = useTranslation()

  const slidesData = [
    {
      number: '01',
      title: t('home.secondSection.firstList.title'),
      firstSentence: t('home.secondSection.firstList.firstSentence'),
      secondSentence: t('home.secondSection.firstList.secondSentence'),
      thirdSentence: t('home.secondSection.firstList.thirdSentence'),
      fourthSentence: t('home.secondSection.firstList.fourthSentence'),
      image: 'dummy.jpg',
      bgColor: 'bg-emerald-600',
    },
    {
      number: '02',
      title: t('home.secondSection.secondList.title'),
      firstSentence: t('home.secondSection.secondList.firstSentence'),
      secondSentence: t('home.secondSection.secondList.secondSentence'),
      thirdSentence: t('home.secondSection.secondList.thirdSentence'),
      fourthSentence: t('home.secondSection.secondList.fourthSentence'),
      fifthSentence: t('home.secondSection.secondList.fifthSentence'),
      image: 'dummy2.jpg',
      bgColor: 'bg-indigo-600',
    },
    {
      number: '03',
      title: t('home.secondSection.thirdList.title'),
      firstSentence: t('home.secondSection.thirdList.firstSentence'),
      secondSentence: t('home.secondSection.thirdList.secondSentence'),
      thirdSentence: t('home.secondSection.thirdList.thirdSentence'),
      fourthSentence: t('home.secondSection.thirdList.fourthSentence'),
      image: 'dummy.jpg',
      bgColor: 'bg-rose-600',
    },
    {
      number: '04',
      title: t('home.secondSection.fourthList.title'),
      firstSentence: t('home.secondSection.fourthList.firstSentence'),
      secondSentence: t('home.secondSection.fourthList.secondSentence'),
      thirdSentence: t('home.secondSection.fourthList.thirdSentence'),
      fourthSentence: t('home.secondSection.fourthList.fourthSentence'),
      image: 'dummy2.jpg',
      bgColor: 'bg-yellow-600',
    }
  ];

  const containerRef = useRef(null);
  const numSlides = slidesData.length;

  useGSAP(() => {
    const slides = gsap.utils.toArray('.scroll-slide-wrapper');

    // 1. Calculate Total Scroll Distance:
    // We need 100vh of scroll for each slide's animation to complete.
    const scrollDuration = numSlides * window.innerHeight;

    // 2. Pin the main component container for the entire effect duration
    ScrollTrigger.create({
      trigger: containerRef.current,
      // START: When the TOP of the trigger hits the TOP of the viewport
      start: 'top top', 
      // END: The total duration of the pinned scroll
      end: `+=${scrollDuration}`, 
      pin: true,
      pinSpacing: false, // Prevent ScrollTrigger from adding extra margin/padding
      scrub: 1,
      // markers: true,
    });

    // 3. Animate each individual slide
    slides.forEach((slideWrapper, i) => {
      const slideInner = slideWrapper.querySelector('.slide-inner');
      const descriptionText = slideWrapper.querySelector('.description-text');
      const slideImage = slideWrapper.querySelector('.slide-image');

      // The starting point for this slide's animation
      const startPoint = i * window.innerHeight;
      
      // The final TOP position of the slide wrapper after its content is pinned
      const finalTopPosition = i * PINNED_HEIGHT_PX;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: startPoint,
          end: startPoint + window.innerHeight,
          scrub: true,
          // markers: true,
        },
      });

      // --- Animation Sequence for current slide ---
      
      // Phase 1: Shrink the height and reposition the wrapper
      // We perform the repositioning FIRST (to 0vh) and shrinking AFTER (to 100vh)
      // to fix the "reversed animation" issue.
      tl.to(slideWrapper, {
        // Move the wrapper up to its final pinned stack position
        top: `${finalTopPosition}px`, 
        ease: 'none', 
      }, 0)
      
      // Phase 2: Fade out content and shrink the inner element height
      .to([descriptionText, slideImage], {
        opacity: 0,
        ease: 'power1.in',
      }, 0) 
      
      .to(slideInner, {
        height: `${PINNED_HEIGHT_PX}px`, // Shrink the height down to the pinned title height
        ease: 'power1.inOut',
      }, 0); 
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full"> 

      <div className="relative w-full h-screen">
        
        {slidesData.map((slide, index) => {
          // Initial position: stack the slides based on the titles above them
          const initialTop = index * PINNED_HEIGHT_PX;

          return (
            <div
              key={index}
              className={`scroll-slide-wrapper absolute left-0 w-full h-full transition-colors duration-500`}
              style={{ 
                zIndex: 30 - index, 
                // Initial top position starts where the pinned title will end up.
                // We use '0' here because the GSAP timeline handles moving the first slide up from 0 to 0.
                // For all slides, the top is set by the GSAP timeline.
                top: `${index === 0 ? 0 : initialTop}px`, 
              }}
            >
              <section 
                // CRITICAL FIX: Add h-screen here to ensure full height initially
                className={`slide-inner ${slide.bgColor} w-full **h-screen** mx-auto flex flex-col`}
                style={{ height: '100vh' }} 
              >
                
                {/* Title and Number */}
                <header className="flex items-center justify-between p-4 bg-transparent w-full h-[100px] flex-shrink-0 text-white">
                  <h2 className="text-4xl sm:text-6xl font-extrabold flex items-center space-x-4">
                    <span className="text-2xl sm:text-3xl font-light opacity-80">{slide.number}</span>
                    <span>{slide.title}</span>
                  </h2>
                </header>

                {/* Description and Image */}
                <div className="slide-content flex flex-grow p-4 mt-4 overflow-hidden text-white">
                  <div className='description-text w-1/2 text-xl sm:text-2xl font-light leading-relaxed pr-8 opacity-100'>
                    <p>
                      {slide.firstSentence}
                    </p>
                    <p>
                      {slide.secondSentence}
                    </p>
                    <p>
                      {slide.thirdSentence}
                    </p>
                    <p>
                      {slide.fourthSentence}
                    </p>
                  </div>
                  <div className="w-1/2 flex items-center justify-center">
                    <img
                      src={slide.image}
                      alt={`Image for slide ${slide.number}`}
                      className="slide-image w-full max-h-full object-cover rounded-xl shadow-2xl opacity-100"
                    />
                  </div>
                </div>
              </section>
            </div>
          );
        })}
      </div>

      {/* A final section after the pinned slides */}
      <div className="relative z-0 h-[100vh] w-full bg-gray-900 text-white flex items-center justify-center text-4xl sm:text-5xl font-bold">
        Effect Complete!
      </div>
    </div>
  );
};

export default Expertise;