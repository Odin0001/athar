'use client'
import question from '@/public/why-us.jpg'
import { useTranslation } from '@/components/LanguageProvider'
import Image from 'next/image'

const WhyUs = () => {

  const { t } = useTranslation()

  return (
    <section className="min-h-screen w-full bg-white relative">
      <Image src={question} alt='question mark' fill className='object-cover absolute z-10 scale-90' />
      <div className='absolute top-1/2 left-1/2 -translate-1/2 z-20 w-full flex flex-col items-center gap-6 px-6 text-center'>
        <h1 className='text-strawberry-red lg:text-9xl text-4xl font-extrabold'>{t('home.fourthSection.title')}</h1>
        <p className='text-prussian-blue font-bold lg:text-5xl text-xl w-full'>{t('home.fourthSection.sentence')}</p>
      </div>
    </section>
  )
}

export default WhyUs