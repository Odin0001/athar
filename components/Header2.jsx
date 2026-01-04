'use client'
import header from "@/public/header.jpg";
import header2 from "@/public/header2.jpg";
import Image from "next/image";
import { useTranslation } from '@/components/LanguageProvider' 

const Header2 = () => {

  const { t, lang } = useTranslation()

  return (
    <header className={`relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-20 ${lang === 'ar' ? 'items-end' : 'items-start'}`}>
      <picture className="absolute inset-0 w-full h-full block -z-10">
        <source
          media="(max-width: 640px)"
          srcSet={`${header.src} 1x, ${header2.src} 2x`}
          type="image/jpeg"
        />
        <source
          media="(min-width: 641px)"
          srcSet={`${header2.src} 1x, ${header.src} 2x`}
          type="image/jpeg"
        />
        <img
          src={header2.src}
          alt="header image"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </picture>
      <div className={`w-full max-w-4xl ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px] font-extrabold text-white mb-4 sm:mb-6 md:mb-8 lg:mb-10 leading-tight sm:leading-tight md:leading-tight lg:leading-[2">{t('home.headerTitle')}</h1>
        <p className="text-white text-base sm:text-lg md:text-xl mb-4 sm:mb-6">{t('home.headerSlogan')}</p>
        <button className="my-6 sm:my-8 md:my-10">
          <a href="https://www.youtube.com/@AtharCreativeagency" target="_blank" className="rounded-full py-2 px-4 sm:px-6 border border-white text-white text-sm sm:text-base hover:bg-white hover:text-black transition-colors duration-300">{t('home.headerButton')}</a>
        </button>
        <p className="text-white text-base sm:text-lg md:text-xl">{t('home.firstSection.secondSentence')}</p>
      </div>
    </header>
  )
}

export default Header2