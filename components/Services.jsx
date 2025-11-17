'use client'
import dummy from '@/public/dummy.jpg'
import Image from 'next/image'
import { useTranslation } from '@/components/LanguageProvider'

const Services = () => {
  
  const { t } = useTranslation()

  const data = [
    {
      title: t('ourApproach.firstSection.title'),
      subTitle1: t('ourApproach.firstSection.subTitle1'),
      firstSentence: t('ourApproach.firstSection.firstSentence'),
      subTitle2: t('ourApproach.firstSection.subTitle2'),
      secondSentence: t('ourApproach.firstSection.secondSentence'),
      subTitle3: t('ourApproach.firstSection.subTitle3'),
      thirdSentence: t('ourApproach.firstSection.thirdSentence'),
      subTitle4: t('ourApproach.firstSection.subTitle4'),
      fourthSentence: t('ourApproach.firstSection.fourthSentence'),
      description: 'desc 1',
      img: dummy
    },
    {
      title: t('ourApproach.secondSection.title'),
      subTitle1: t('ourApproach.secondSection.subTitle1'),
      firstSentence: t('ourApproach.secondSection.firstSentence'),
      subTitle2: t('ourApproach.secondSection.subTitle2'),
      secondSentence: t('ourApproach.secondSection.secondSentence'),
      subTitle3: t('ourApproach.secondSection.subTitle3'),
      thirdSentence: t('ourApproach.secondSection.thirdSentence'),
      subTitle4: t('ourApproach.secondSection.subTitle4'),
      fourthSentence: t('ourApproach.secondSection.fourthSentence'),
      description: 'desc 2',
      img: dummy
    },
    {
      title: t('ourApproach.thirdSection.title'),
      subTitle1: t('ourApproach.thirdSection.subTitle1'),
      firstSentence: t('ourApproach.thirdSection.firstSentence'),
      subTitle2: t('ourApproach.thirdSection.subTitle2'),
      secondSentence: t('ourApproach.thirdSection.secondSentence'),
      subTitle3: t('ourApproach.thirdSection.subTitle3'),
      thirdSentence: t('ourApproach.thirdSection.thirdSentence'),
      subTitle4: t('ourApproach.thirdSection.subTitle4'),
      fourthSentence: t('ourApproach.thirdSection.fourthSentence'),
      description: 'desc 2',
      img: dummy
    },
  ]
  
  return (
    <div className='w-full bg-black px-4 py-42'>
      {data.map((item, index) => (
        <div key={index} className='w-full min-h-screen'>
          <div className={`flex ${index % 2 != 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col justify-between gap-20 max-w-7xl mx-auto`}>
            <Image src={item.img} width={500} alt={item.title} />
            <div className='flex flex-col gap-8 flex-1'>
              <h2 className='text-5xl font-bold text-white py-4 max-w-3xl w-max relative'>
                {item.title}
                <hr className='absolute bottom-0 left-0 w-full bg-white text-white border border-white' />
              </h2>
              <div className='grid lg:grid-cols-2 grid-cols-1 gap-10'>
                <div>
                  <h3 className='text-white text-2xl mb-10'>{item.subTitle1}</h3>
                  <p className='text-white'>{item.firstSentence}</p>
                </div>
                <div>
                  <h3 className='text-white text-2xl mb-10'>{item.subTitle2}</h3>
                  <p className='text-white'>{item.secondSentence}</p>
                </div>
                <div>
                  <h3 className='text-white text-2xl mb-10'>{item.subTitle3}</h3>
                  <p className='text-white'>{item.thirdSentence}</p>
                </div>
                <div>
                  <h3 className='text-white text-2xl mb-10'>{item.subTitle4}</h3>
                  <p className='text-white'>{item.fourthSentence}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Services