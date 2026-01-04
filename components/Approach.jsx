'use client'
import Image from "next/image"
import approach from "@/public/approach.jpg";
import approach2 from "@/public/approach2.jpg";
import { useTranslation } from '@/components/LanguageProvider'
import Link from "next/link";

const Approach = () => {

  const { t } = useTranslation()

  return (
    <section>
      <div className="relative min-h-screen w-full">
        <picture className="absolute inset-0 w-full h-full block">
          <source
            media="(max-width: 640px)"
            srcSet={`${approach2.src} 1x, ${approach.src} 2x`}
            type="image/jpeg"
          />
          <source
            media="(min-width: 641px)"
            srcSet={`${approach.src} 1x, ${approach2.src} 2x`}
            type="image/jpeg"
          />
          <img
            src={approach.src}
            alt="Our Approach"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>

        <div className="max-w-7xl w-full absolute top-1/2 left-1/2 -translate-1/2 z-20 text-white text-center flex flex-col items-center justify-center gap-10">
          <h1 className="lg:text-8xl md:text-6xl text-4xl font-extrabold">{t('home.thirdSection.title')}</h1>
          <p className="lg:text-4xl md:text-xl text-lg font-regular">{t('home.thirdSection.firstSentence')}</p>
          <p className="lg:text-4xl md:text-xl text-lg font-regular">{t('home.thirdSection.secondSentence')}</p>
          <Link href='/approach' className="bg-strawberry-red rounded-full py-2 px-6 text-white">{t('home.thirdSection.button')}</Link>
        </div>
      </div>
    </section>
  )
}

export default Approach