"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, Power1, Power2 } from "gsap";
import { useTranslation } from '@/components/LanguageProvider'
import Image from "next/image";
import dummy from '@/public/vercel.svg'
import Link from "next/link";

const Navbar = () => {
  const { t, lang, setLang } = useTranslation()
  const burgerTop = useRef(null);
  const burgerMid = useRef(null);
  const burgerBot = useRef(null);
  const sidebar = useRef(null);
  const sideText = useRef([]);
  const tl = useRef(null);
  const [scrolled, setScrolled] = useState(false)
  const items = [
    {
      text: t('home.headerTitle'),
      link: '/'
    },
    {
      text: t('nav.about'),
      link: '/about'
    },
    {
      text: t('nav.services'),
      link: '/services'
    },
    {
      text: t('nav.approach'),
      link: '/approach'
    },
    {
      text: t('nav.why'),
      link: '/why-athar'
    },
    {
      text: t('nav.contact'),
      link: '/contact'
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true, reversed: true });
    tl.current
      // animate burger lines
      .to(burgerTop.current, { y: 11, duration: 0.7, ease: Power1.easeInOut })
      .to(
        burgerBot.current,
        { y: -11, duration: 0.7, ease: Power1.easeInOut },
        "-=0.7"
      )
      .to(burgerTop.current, { rotation: 585, duration: 1 })
      .to(burgerMid.current, { rotation: 585, duration: 1 }, "-=1")
      .to(burgerBot.current, { rotation: 675, duration: 1 }, "-=1")
      .to(
        [burgerTop.current, burgerMid.current, burgerBot.current],
        { duration: 0.1, ease: Power1.easeOut },
        "-=1"
      )
      // delay sidebar until burger is done
      .to(
        sidebar.current,
        { x: -550, duration: 1, ease: Power2.easeOut },
        "+=0.2"
      )
      .fromTo(
        sideText.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: Power1.easeOut },
        "-=0.5"
      )
      .to(sideText.current, { color: "#000", duration: 0.2 });
  }, []);

  const haminate = () => {
    if (tl.current.reversed()) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  };

  const handleLangChange = (newLang) => {
    setLang(newLang);
    // You might want to close the sidebar after changing language, but let's keep it open for now
    haminate();
  }

  return (
    <>
    <div className={`w-full fixed top-0 left-1/2 -translate-x-1/2 z-[100] ${scrolled ? 'bg-white shadow' : 'bg-transparent'} transition-colors duration-300 ease`}>
      <nav className={`w-3/4 mx-auto flex justify-between items-center p-5`}>
        <Image src={dummy} alt='logo' width={50} />
        {/* Burger Menu (always on top) */}
        <button
          className="w-[40px] h-[30px] cursor-pointer"
          onClick={haminate}
        >
          <span
            ref={burgerTop}
            className="block relative w-[40px] border-t-[6px] border-[#66B3FF] mt-[5px] rounded-full"
          ></span>
          <span
            ref={burgerMid}
            className="block relative w-[40px] border-t-[6px] border-[#66B3FF] mt-[5px] rounded-full"
          ></span>
          <span
            ref={burgerBot}
            className="block relative w-[40px] border-t-[6px] border-[#66B3FF] mt-[5px] rounded-full"
          ></span>
        </button>
      </nav>
    </div>
      {/* Sidebar (under the burger) */}
      <nav
        ref={sidebar}
        className="bg-white md:w-1/4 w-full h-full fixed top-0 right-0 -mr-[550px] z-[99]"
      >
        <div className="flex justify-center space-x-4 pt-16 mt-28 md:pt-4">
            <button
                onClick={() => handleLangChange('en')}
                className={`px-4 py-2 font-semibold text-lg rounded-lg transition-all duration-300 cursor-pointer ${
                    lang === 'en' 
                    ? 'bg-cyan-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
                EN
            </button>
            <button
                onClick={() => handleLangChange('ar')}
                className={`px-4 py-2 font-semibold text-lg rounded-lg transition-all duration-300 cursor-pointer ${
                    lang === 'ar' 
                    ? 'bg-cyan-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
                AR
            </button>
        </div>
        <ul className="w-full text-center">
          {items.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              ref={(el) => (sideText.current[i] = el)}
              onClick={haminate}
              className="block text-[3.7vw] mb-[20px] font-bold cursor-pointer transition-all duration-1000 ease-in-out min-w-full text-cyan-600"
            >
              {item.text}
            </Link>
          ))}
        </ul>
      </nav>
    
    </>
  );
};

export default Navbar;
