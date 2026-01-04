"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from '@/components/LanguageProvider'
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// Define the fixed height of the final pinned title/number bar
const PINNED_HEIGHT_PX = 100;



const Expertise = () => {
  
  const { t, lang } = useTranslation()

  const slidesData = [
    {
      number: '',
      title: t('home.secondSection.servicesTitle'),
      firstSentence: '',
      secondSentence: '',
      thirdSentence: '',
      fourthSentence: '',
      image: '',
      bgImage: '',
      bgColor: 'bg-ice-blue',
    },
    {
      number: '01',
      title: t('home.secondSection.firstList.title'),
      firstSentence: t('home.secondSection.firstList.firstSentence'),
      secondSentence: t('home.secondSection.firstList.secondSentence'),
      thirdSentence: t('home.secondSection.firstList.thirdSentence'),
      fourthSentence: t('home.secondSection.firstList.fourthSentence'),
      image: '/direction.png',
      bgImage: '/home-direction.png',
      bgColor: 'bg-mint-leaf',
    },
    {
      number: '02',
      title: t('home.secondSection.secondList.title'),
      firstSentence: t('home.secondSection.secondList.firstSentence'),
      secondSentence: t('home.secondSection.secondList.secondSentence'),
      thirdSentence: t('home.secondSection.secondList.thirdSentence'),
      fourthSentence: t('home.secondSection.secondList.fourthSentence'),
      fifthSentence: t('home.secondSection.secondList.fifthSentence'),
      image: '/brand.png',
      bgImage: '/home-brand.png',
      bgColor: 'bg-white',
    },
    {
      number: '03',
      title: t('home.secondSection.thirdList.title'),
      firstSentence: t('home.secondSection.thirdList.firstSentence'),
      secondSentence: t('home.secondSection.thirdList.secondSentence'),
      thirdSentence: t('home.secondSection.thirdList.thirdSentence'),
      fourthSentence: t('home.secondSection.thirdList.fourthSentence'),
      image: '/digital.png',
      bgImage: '/home-digital.png',
      bgColor: 'bg-strawberry-red',
    },
    {
      number: '04',
      title: t('home.secondSection.fourthList.title'),
      firstSentence: t('home.secondSection.fourthList.firstSentence'),
      secondSentence: t('home.secondSection.fourthList.secondSentence'),
      thirdSentence: t('home.secondSection.fourthList.thirdSentence'),
      fourthSentence: t('home.secondSection.fourthList.fourthSentence'),
      image: '/crafted.png',
      bgImage: '/home-brand.png',
      bgColor: 'bg-dark-teal',
    },
    {
      number: '',
      title: '',
      firstSentence: '',
      secondSentence: '',
      thirdSentence: '',
      fourthSentence: '',
      image: '',
      bgImage: '',
      bgColor: 'bg-dark-teal',
    },
  ];

  const containerRef = useRef(null);
  const numSlides = slidesData.length;

  useGSAP(() => {
    const slides = gsap.utils.toArray('.scroll-slide-wrapper');

    // 1. Calculate Total Scroll Distance:
    // We need 100vh for the first slide to be pinned at the top,
    // then 100vh of scroll for each slide's animation to complete.
    const scrollDuration = (numSlides + 1) * window.innerHeight;

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
      // For the first slide (i=0), we want it to start animating only after it's pinned at the top
      // This means we need to wait until the scroll has progressed enough (1 viewport height) for the first slide to be pinned
      // For subsequent slides, they start after their previous slides have completed
      const startPoint = (i + 1) * window.innerHeight;
      
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

    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 5000)
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
                className={`slide-inner ${slide.bgColor} w-full h-screen mx-auto flex flex-col`} 
              >
                
                {/* Title and Number */}
                <header className={`flex items-center ${lang === 'ar' ? 'justify-end' : 'justify-start'} p-4 bg-transparent w-full h-[100px] flex-shrink-0 ${slide.bgColor === 'bg-ice-blue' ? 'text-prussian-blue' : slide.number === '02' ? 'text-dark-teal' : 'text-white'}`}>
                  <h2 className={`text-2xl sm:text-6xl font-extrabold flex items-center ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : 'space-x-4'}`}>
                    <span className="text-2xl sm:text-3xl font-light opacity-80">{slide.number}</span>
                    <div className='relative inline-block'>
                      {slide.bgImage && (
                        <div className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-[150px] h-[80px] z-10`}>
                          <Image 
                            src={slide.bgImage} 
                            alt={`Background image for slide ${slide.number}`} 
                            fill
                            className="object-cover"
                            sizes="200px"
                          />
                        </div>
                      )}
                      <span className='relative z-20'>{slide.title}</span>
                    </div>
                  </h2>
                </header>

                {/* Description and Image */}
                <div className={`slide-content flex ${lang === 'ar' ? 'lg:flex-row-reverse flex-col lg:items-start items-end' : 'lg:flex-row flex-col'} flex-grow p-4 mt-4 overflow-hidden ${slide.number === '02' ? 'text-dark-teal' : 'text-white'}`}>
                  <ul 
                    className={`description-text lg:w-1/2 w-full text-sm sm:text-2xl font-light leading-relaxed opacity-100 sm:space-y-2 space-y-0 ${lang === 'ar' ? 'text-right pr-10' : 'text-left pl-10'}`} 
                    style={{ 
                      listStyleType: 'disc', 
                      listStylePosition: 'outside',
                      ...(lang === 'ar' && { direction: 'rtl' })
                    }}
                  >
                    {slide.firstSentence && <li>
                      {slide.firstSentence}
                    </li>}
                    {slide.secondSentence && <li>
                      {slide.secondSentence}
                    </li>}
                    {slide.thirdSentence && <li>
                      {slide.thirdSentence}
                    </li>}
                    {slide.fourthSentence && <li>
                      {slide.fourthSentence}
                    </li>}
                  </ul>
                  <div className="w-1/2 flex justify-center items-start">
                    {slide.image && <Image
                      src={slide.image}
                      alt={`Image for slide ${slide.number}`}
                      width={600}
                      height={300}
                      className="slide-image object-cover opacity-100 xl:w-[400px] lg:w-[300px] md:w-[250px] w-[200px]"
                    />}
                  </div>
                </div>
              </section>
            </div>
          );
        })}
      </div>

      {/* A final section after the pinned slides */}
      <div className="z-0 h-[320vh] w-full bg-gray-900 text-white flex items-center justify-center text-4xl sm:text-5xl font-bold">
        Effect Complete!
      </div>
    </div>
  );
};

export default Expertise;