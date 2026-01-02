'use client'
import Image from "next/image"
import approach from "@/public/approach.jpg";
import { useTranslation } from '@/components/LanguageProvider'

const Approach = () => {

  const { t } = useTranslation()

  return (
    <section>
      <div className="relative min-h-screen w-full">
        <Image src={approach} alt='Our Approach' fill className="absolute object-cover" />
        <div className="max-w-7xl w-full absolute top-1/2 left-1/2 -translate-1/2 z-20 text-white text-center flex flex-col items-center justify-center gap-10">
          <h1 className="lg:text-8xl md:text-6xl text-4xl font-extrabold">{t('home.thirdSection.title')}</h1>
          <p className="lg:text-4xl md:text-xl text-lg font-bold">{t('home.thirdSection.firstSentence')}</p>
          <p className="lg:text-4xl md:text-xl text-lg font-bold">{t('home.thirdSection.secondSentence')}</p>
        </div>
      </div>
    </section>
  )
}

export default Approach