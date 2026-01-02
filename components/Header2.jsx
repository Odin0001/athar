'use client'
import header from "@/public/header2.jpg";
import Image from "next/image";
import { useTranslation } from '@/components/LanguageProvider' 

const Header2 = () => {

  const { t, lang } = useTranslation()

  return (
    <header className={`relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-20 ${lang === 'ar' ? 'items-end' : 'items-start'}`}>
      <Image src={header} fill priority={true} alt='header image' className="-z-10 object-cover" />
      <div className={`w-full max-w-4xl ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px] font-extrabold text-white mb-4 sm:mb-6 md:mb-8 lg:mb-10 leading-tight sm:leading-tight md:leading-tight lg:leading-[1.1]">{t('home.headerTitle')}</h1>
        <p className="text-white text-base sm:text-lg md:text-xl mb-4 sm:mb-6">{t('home.headerSlogan')}</p>
        <button className="my-6 sm:my-8 md:my-10">
          <a href="https://www.youtube.com" target="_blank" className="rounded-full py-2 px-4 sm:px-6 border border-white text-white text-sm sm:text-base hover:bg-white hover:text-black transition-colors duration-300">Use Now</a>
        </button>
        <p className="text-white text-base sm:text-lg md:text-xl">{t('home.firstSection.secondSentence')}</p>
      </div>
    </header>
  )
}

export default Header2