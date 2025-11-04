'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { SplitText } from 'gsap/SplitText';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useTranslation } from '@/components/LanguageProvider'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, ScrollSmoother);

export default function ParallaxPage() {
  const { t } = useTranslation()

  const sections = [
    {
      img: 'https://assets.codepen.io/61488/duda-1.jpg',
      title: t('ourApproach.firstSection.title'),
      subTitle1: t('ourApproach.firstSection.subTitle1'),
      firstSentence: t('ourApproach.firstSection.firstSentence'),
      subTitle2: t('ourApproach.firstSection.subTitle2'),
      secondSentence: t('ourApproach.firstSection.secondSentence'),
      subTitle3: t('ourApproach.firstSection.subTitle3'),
      thirdSentence: t('ourApproach.firstSection.thirdSentence'),
      subTitle4: t('ourApproach.firstSection.subTitle4'),
      fourthSentence: t('ourApproach.firstSection.fourthSentence'),
    },
    {
      img: 'https://assets.codepen.io/61488/duda-2.jpg',
      title: t('ourApproach.secondSection.title'),
      subTitle1: t('ourApproach.secondSection.subTitle1'),
      firstSentence: t('ourApproach.secondSection.firstSentence'),
      subTitle2: t('ourApproach.secondSection.subTitle2'),
      secondSentence: t('ourApproach.secondSection.secondSentence'),
      subTitle3: t('ourApproach.secondSection.subTitle3'),
      thirdSentence: t('ourApproach.secondSection.thirdSentence'),
      subTitle4: t('ourApproach.secondSection.subTitle4'),
      fourthSentence: t('ourApproach.secondSection.fourthSentence'),
    },
    {
      img: 'https://assets.codepen.io/61488/duda-3.jpg',
      title: t('ourApproach.thirdSection.title'),
      subTitle1: t('ourApproach.thirdSection.subTitle1'),
      firstSentence: t('ourApproach.thirdSection.firstSentence'),
      subTitle2: t('ourApproach.thirdSection.subTitle2'),
      secondSentence: t('ourApproach.thirdSection.secondSentence'),
      subTitle3: t('ourApproach.thirdSection.subTitle3'),
      thirdSentence: t('ourApproach.thirdSection.thirdSentence'),
      subTitle4: t('ourApproach.thirdSection.subTitle4'),
      fourthSentence: t('ourApproach.thirdSection.fourthSentence'),
    }
  ]

  useEffect(() => {
    const select = (e) => document.querySelector(e);
    const selectAll = (e) => document.querySelectorAll(e);

    const stage = select('#smooth-content');
    const slides = selectAll('.slide');
    const links = selectAll('.slide__scroll-link');
    
    let slideID = 0;



    // ---------------- Intro Animations ----------------
    const initIntro = () => {
      const tl = gsap.timeline({ delay: 0.7 });
      tl.from('.intro-line', { y: 400, ease: 'power4', duration: 1 })
        .from('.intro__txt', { x: -100, opacity: 0, ease: 'power4', duration: 1 }, 0.7)
        .from('.intro__img--1', { y: 50, opacity: 0, ease: 'power2', duration: 10 }, 1)
        .from('.intro__img--2', { y: -50, opacity: 0, ease: 'power2', duration: 10 }, 1);

      gsap.timeline({
        scrollTrigger: { trigger: '.intro', scrub: 1, start: 'top bottom', end: 'bottom top' }
      }).to('.intro__title', { x: 400, ease: 'power4.in', duration: 1 })
        .to('.intro__txt', { y: 100, ease: 'power4.in', duration: 1 }, 0);
    };

    // ---------------- Slide Links ----------------
    const initLinks = () => {
      links.forEach((link, index) => {
        const linkST = link.querySelector('.slide__scroll-line');
        link.addEventListener('click', (e) => {
          e.preventDefault();
          gsap.to(window, { duration: 2, scrollTo: { y: `#slide-${index + 2}` }, ease: 'power2.inOut' });
          slideID++;
        });
        link.addEventListener('mouseover', () => gsap.to(linkST, { y: 40, duration: 0.6, ease: 'power4' }));
        link.addEventListener('mouseout', () => gsap.to(linkST, { y: 0, duration: 0.6, ease: 'power4' }));
      });

      const top = select('.footer__link-top');
      top.addEventListener('click', (e) => { e.preventDefault(); scrollTop(); });
      top.addEventListener('mouseover', () => gsap.to('.footer__link-top-line', { scaleY: 3, transformOrigin: 'bottom center', duration: 0.6, ease: 'power4' }));
      top.addEventListener('mouseout', () => gsap.to('.footer__link-top-line', { scaleY: 1, transformOrigin: 'bottom center', duration: 0.6, ease: 'power4' }));

      selectAll('.slide-link').forEach(slideLink => {
        const slideL = slideLink.querySelector('.slide-link__line');
        slideLink.addEventListener('mouseover', () => gsap.to(slideL, { x: 20, scaleX: 0.3, transformOrigin: 'right center', duration: 0.8, ease: 'power4' }));
        slideLink.addEventListener('mouseout', () => gsap.to(slideL, { x: 0, scaleX: 1, transformOrigin: 'right center', duration: 0.8, ease: 'power4' }));
      });
    };

    // ---------------- Slide Animations ----------------
    const initSlides = () => {
      slides.forEach(slide => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: slide, start: '40% 50%' } });
        tl.from(slide.querySelectorAll('.col__content-title'), { y: '5vh', duration: 2.5, ease: 'power4' })
          .from(slide.querySelectorAll('.line__inner'), { y: 200, duration: 2, ease: 'power4', stagger: 0.1 }, 0)
          .from(slide.querySelectorAll('.col__content-txt'), { x: 100, y: 50, opacity: 0, duration: 2, ease: 'power4' }, 0.4)
          .from(slide.querySelectorAll('.slide-link'), { x: -100, y: 100, opacity: 0, duration: 2, ease: 'power4' }, 0.3)
          .from(slide.querySelectorAll('.slide__scroll-link'), { y: 200, duration: 3, ease: 'power4' }, 0.4)
          .to(slide.querySelectorAll('.slide__scroll-line'), { scaleY: 0.6, transformOrigin: 'bottom left', duration: 2.5, ease: 'elastic(1,0.5)' }, 1.4);
      });

      gsap.from('.footer__link', {
        scrollTrigger: { trigger: '.footer', scrub: 2, start: '50% 100%', end: '0% 0%' },
        y: '20vh',
        ease: 'sine'
      });
    };

    // ---------------- Parallax ----------------
    const initParallax = () => {
      slides.forEach(slide => {
        gsap.fromTo(slide.querySelectorAll('.col__image-wrap'), { y: '-30vh' }, { 
          y: '30vh', 
          scrollTrigger: { trigger: slide, scrub: true, snap: { snapTo: 0.5, duration: 1, ease: 'power4.inOut' } }, 
          ease: 'none' 
        });
      });
    };

    const scrollTop = () => gsap.to(window, { duration: 2, scrollTo: { y: '#slide-0' }, ease: 'power2.inOut' });

    const initKeys = () => {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' && slideID <= slides.length) {
          slideID++;
          gsap.to(window, { duration: 2, scrollTo: { y: `#slide-${slideID}` }, ease: 'power2.inOut' });
        } else if (e.key === 'ArrowUp') {
          slideID = 0;
          scrollTop();
        }
      });
    };

    // ---------------- Init ----------------
    gsap.set(stage, { autoAlpha: 1 });
    
    initIntro();
    initLinks();
    initSlides();
    initParallax();
    initKeys();
  }, []);

  return (
    <div id="smooth-wrapper" className="overflow-hidden">
      <div className="stage" id="smooth-content" style={{ visibility: 'hidden' }}>
        {/* Intro */}
        <section className="intro h-screen relative overflow-hidden bg-[#C0D7D8] p-4 sm:p-[5vw] flex flex-col justify-end">
          <div className="intro__content relative bottom-0 z-30 mb-8 sm:absolute sm:right-[8%] sm:bottom-[15%] sm:mb-0">
            <h1 className="intro__title text-[10vw] sm:text-[13vw] lg:text-[10vw] xl:text-[13vw] overflow-hidden tracking-tighter sm:pr-[2.3vw]">
              {t('ourApproach.headerTitle')}
            </h1>
            <p className="intro__txt max-w-full mt-4 sm:max-w-[35vw] sm:ml-[25vw] text-base sm:text-lg">
              {t('ourApproach.headerSlogan')}
            </p>
          </div>
          {/* Images need to be scaled down on mobile or hidden for clean layout */}
          <img className="intro__img intro__img--1 hidden md:block absolute z-20 left-[10%] bottom-[35%] w-[35%] max-w-[390px]" src="https://assets.codepen.io/61488/duda-intro-1.jpg" alt="Intro image 1" />
          <img className="intro__img intro__img--2 hidden md:block absolute z-10 left-[25%] bottom-[40%] w-[35%] max-w-[390px]" src="https://assets.codepen.io/61488/duda-intro-2.jpg" alt="Intro image 2" />
        </section>

        {/* Slides */}
        {sections.map((section, n) => (
          <section
            key={n}
            className={`slide flex flex-col lg:flex-row h-auto lg:h-screen overflow-hidden ${n % 2 === 0 ? 'bg-[#C4CDC4]' : ''}`}
            id={`slide-${n}`}
          >
            {/* Column 1: Content */}
            <div className="col col--1 relative z-10 flex-1 order-2 lg:order-1">
              <div className={`col__content col__content--${n} flex flex-col justify-end h-full p-8 lg:p-[6vw_6vw_10vw]`}>
                <h2 className="col__content-title text-5xl sm:text-6xl leading-tight lg:leading-none mb-6 lg:mb-[2vw]">
                  <span className="line__inner">{section.title}</span>
                </h2>
                <div className="col__content-wrap flex flex-col lg:flex-row lg:justify-end">
                  {/* Grid for Subtitles/Sentences */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-full lg:max-w-[50vw]'>
                    
                    <div className='flex flex-col gap-2 text-justify'>
                      <p className="col__content-txt text-lg sm:text-xl font-bold">{section.subTitle1}</p>
                      <p className="col__content-txt max-w-full text-base lg:max-w-[22vw]">{section.firstSentence}</p>
                    </div>

                    <div className='flex flex-col gap-2 text-justify'>
                      <p className="col__content-txt text-lg sm:text-xl font-bold">{section.subTitle2}</p>
                      <p className="col__content-txt max-w-full text-base lg:max-w-[22vw]">{section.secondSentence}</p>
                    </div>

                    <div className='flex flex-col gap-2 text-justify'>
                      <p className="col__content-txt text-lg sm:text-xl font-bold">{section.subTitle3}</p>
                      <p className="col__content-txt max-w-full text-base lg:max-w-[22vw]">{section.thirdSentence}</p>
                    </div>

                    <div className='flex flex-col gap-2 text-justify'>
                      <p className="col__content-txt text-lg sm:text-xl font-bold">{section.subTitle4}</p>
                      <p className="col__content-txt max-w-full text-base lg:max-w-[22vw]">{section.fourthSentence}</p>
                    </div>
                  </div>

                  {/* Link (moved below grid for mobile, same row for desktop) */}
                  <a href="#" className="slide-link relative w-[75px] h-[53px] flex justify-end mt-8 lg:mt-0 lg:ml-8">
                    <div className="slide-link__circ w-[53px] h-[53px] rounded-full border border-[#242423]" />
                    <div className="slide-link__line absolute top-[25px] left-0 w-[64px] h-[3px] bg-[#242423]" />
                  </a>
                </div>
              </div>
              
              {/* Scroll Link (hidden on mobile, relies on native scroll) */}
              <a href={`#slide-${n+1}`} className="slide__scroll-link hidden lg:block absolute right-[-28] bottom-[3.5vw] w-[140px] h-[140px] bg-[#242423]">
                <div className="slide__scroll-line absolute left-[26px] bottom-0 w-[1px] h-full bg-[#242423]" />
              </a>
            </div>

            {/* Column 2: Image */}
            <div className="col col--2 relative flex-1 overflow-hidden h-[50vh] lg:h-screen order-1 lg:order-2">
              <div className="col__image-wrap absolute w-full h-[120vh] lg:h-[160vh]">
                <img className="img object-cover w-full h-full" src={section.img} alt={section.title} />
              </div>
            </div>
          </section>
        ))}

        {/* Footer */}
        <footer className="footer h-screen flex flex-col items-center justify-center bg-gray-300 relative">
          <a href="http://www.duda.ie/" target="_blank" className="footer__link text-[5vw] text-[#242423]">ATHAR</a>
          <a href="#slide-0" className="footer__link-top absolute left-1/2 bottom-[24] transform -translate-x-1/2 w-[100px] h-[100px] bg-[#242423] text-white flex items-center justify-center">Top
            <span className="footer__link-top-line absolute top-[-50px] left-1/2 w-[1px] h-[50px] bg-[#242423]" />
          </a>
          <p className="footer__copyright absolute left-1/2 bottom-6 transform -translate-x-1/2">All images © 2020 Dave Uda</p>
        </footer>
      </div>
    </div>
  );
}
