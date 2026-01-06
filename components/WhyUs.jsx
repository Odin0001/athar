'use client'
import question from '@/public/why-us.jpg'
import questionMark from '@/public/question.png'
import red from '@/public/red1.png'
import green from '@/public/green1.png'
import yellow from '@/public/yellow1.png'
import blue from '@/public/blue1.png'
import { useTranslation } from '@/components/LanguageProvider'
import Image from 'next/image'
import Link from 'next/link'

const WhyUs = () => {

  const { t } = useTranslation()

  return (
    <section className="min-h-screen w-full bg-white relative">
      <Image src={question} alt='question mark' fill className='object-cover absolute z-10 scale-90 lg:block hidden' />
      <Image src={questionMark} alt='question mark' width={300} className='absolute top-1/2 left-1/2 -translate-1/2 z-10 lg:hidden block' />
      <Image src={red} alt='red circle' width={80} className='absolute top-24 left-8 z-10 lg:hidden block' />
      <Image src={green} alt='green circle' width={65} className='absolute top-36 right-8 z-10 lg:hidden block' />
      <Image src={yellow} alt='yellow circle' width={55} className='absolute bottom-24 left-14 z-10 lg:hidden block' />
      <Image src={blue} alt='blue circle' width={130} className='absolute top-42 right-1/2 translate-x-1/2 z-10 lg:hidden block' />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[150px] z-20 w-full flex flex-col items-center gap-6 px-6 text-center'>
        <h1 className='text-strawberry-red lg:text-7xl text-4xl font-extrabold'>{t('home.fourthSection.title')}</h1>
        <p className='text-prussian-blue font-bold lg:text-4xl text-xl leading-relaxed w-full'>
          {t('home.fourthSection.sentence')}&nbsp;
          <span className='relative'>
            <Image src={blue} alt='blue underline' width={150} className='absolute bottom-0 left-1/2 -translate-x-1/2 -z-10' />
            {t('home.fourthSection.top')}
          </span>
        </p>
        <Link href='/why-athar' className="bg-strawberry-red rounded-full py-2 px-6 text-white">{t('home.fourthSection.button')}</Link>
      </div>
    </section>
  )
}

export default WhyUs