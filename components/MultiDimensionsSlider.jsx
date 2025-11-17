'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '@/components/LanguageProvider'
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function MultiDimensionsSlider() {
  const { t } = useTranslation()
  const containerRef = useRef(null);
  const panel1Ref = useRef(null);
  const panel2Ref = useRef(null);
  const panel3Ref = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const panel1 = panel1Ref.current;
    const panel2 = panel2Ref.current;
    const panel3 = panel3Ref.current;

    if (!container || !panel1 || !panel2 || !panel3) return;

    const scrollDistance = container.offsetHeight * 4;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        // markers: true, // Uncomment to debug
      },
    });

    tl.from(panel1, { xPercent: -100, ease: 'none', duration: 2 })
      .from(panel2, { yPercent: -100, ease: 'none', duration: 2 })
      .from(panel3, { xPercent: 100, ease: 'none', duration: 2 });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <div className="w-full">
      {/* Banner Section */}
      <div
        className="relative h-screen flex justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2016/11/21/14/57/wheat-1845835_960_720.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#DA9100] opacity-50"></div>
        <h1 className="relative z-10 text-6xl md:text-8xl font-extrabold text-white text-center p-4 rounded-lg bg-black bg-opacity-30">
          {t('home.thirdSection.title')}
        </h1>
      </div>

      {/* ScrollTrigger Container */}
      <div
        ref={containerRef}
        className="relative h-screen bg-white overflow-hidden"
      >
        {/* Panel 0: Base panel */}
        <div className="absolute inset-0 h-full w-full flex flex-col justify-center items-center space-y-8 bg-white z-10 p-8">
          <p className="text-black text-xl md:text-3xl font-light leading-relaxed mb-6">
            {t('home.thirdSection.firstSentence')}
          </p>
          <Link href='/services' className="bg-orange-500 hover:bg-orange-600 transition duration-300 text-white font-bold py-3 px-6 rounded-xl shadow-xl text-lg md:text-xl">
            Learn More
          </Link>
        </div>

        {/* Panel 1 */}
        <div
          ref={panel1Ref}
          className="absolute inset-0 h-full w-full bg-cover bg-center flex flex-col justify-start p-8 md:p-20 z-20"
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2017/07/27/11/16/prayer-2544994_960_720.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative z-10 max-w-3xl flex justify-center items-center mx-auto w-full h-full">
            <div className='text-center'>
              <p className="text-white text-xl md:text-3xl font-light leading-relaxed mb-6">
                {t('home.thirdSection.secondSentence')}
              </p>
              <Link href='/services' className="bg-orange-500 hover:bg-orange-600 transition duration-300 text-white font-bold py-3 px-6 rounded-xl shadow-xl text-lg md:text-xl">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Panel 2 */}
        <div
          ref={panel2Ref}
          className="absolute inset-0 h-full w-full bg-white flex flex-col justify-center items-center p-8 space-y-4 z-30"
        >
          <div className="bg-gray-100 rounded-2xl w-full max-w-4xl h-3/5 shadow-2xl p-6 flex justify-center items-center" style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2017/07/27/11/16/prayer-2544994_960_720.jpg')",
          }}>
            
          </div>
          <p className="w-full max-w-4xl text-center text-xl md:text-3xl font-medium text-gray-700 p-4">
            {t('home.fourthSection.sentence')}
          </p>
          <Link href='/services' className="bg-orange-500 hover:bg-orange-600 transition duration-300 text-white font-bold py-3 px-6 rounded-xl shadow-xl text-lg md:text-xl">
            Learn More
          </Link>
        </div>

        {/* Panel 3 */}
        <div
          ref={panel3Ref}
          className="absolute inset-0 h-full w-full bg-cover bg-center flex flex-col justify-end p-8 md:p-20 z-40"
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2015/03/26/09/58/headphones-690685_960_720.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative z-10 max-w-3xl mb-12 self-end text-right">
            <p className="text-white text-xl md:text-3xl font-light leading-relaxed mb-6">
              {t('home.thirdSection.secondSentence')}
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 transition duration-300 text-white font-bold py-3 px-6 rounded-xl shadow-xl text-lg md:text-xl">
              Another Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
