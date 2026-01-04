'use client'
import service1 from '@/public/service1.png'
import service2 from '@/public/service2.png'
import service3 from '@/public/service3.png'
import service4 from '@/public/service4.png'
import Image from 'next/image'
import { useTranslation } from '@/components/LanguageProvider'

const Services = () => {
  
  const { t, lang } = useTranslation()

  const data = [
    {
      title: t('services.firstSection.title'),
      description: t('services.firstSection.firstSentence'),

      list: [
        t('services.firstSection.list.item1'),
        t('services.firstSection.list.item2'),
        t('services.firstSection.list.item3'),
        t('services.firstSection.list.item4'),
      ],
      img: service1
    },
    {
      title: t('services.secondSection.title'),
      description: t('services.secondSection.firstSentence'),
      list: [
        t('services.secondSection.list.item1'),
        t('services.secondSection.list.item2'),
        t('services.secondSection.list.item3'),
        t('services.secondSection.list.item4'),
        t('services.secondSection.list.item5'),
      ],
      img: service2
    },
    {
      title: t('services.thirdSection.title'),
      description: t('services.thirdSection.firstSentence'),
      list: [
        t('services.thirdSection.list.item1'),
        t('services.thirdSection.list.item2'),
        t('services.thirdSection.list.item3'),
        t('services.thirdSection.list.item4'),
      ],
      img: service3
    },
    {
      title: t('services.fourthSection.title'),
      description: t('services.fourthSection.firstSentence'), 
      list: [
        t('services.fourthSection.list.item1'),
        t('services.fourthSection.list.item2'),
        t('services.fourthSection.list.item3'),
        t('services.fourthSection.list.item4'),
        t('services.fourthSection.list.item5'),
      ],
      img: service4
    },
  ]
  
  return (
    <div className='w-full bg-white px-4 py-42'>
      {data.map((item, index) => (
        <div key={index} className='w-full min-h-screen'>
          <div className={`flex ${index % 2 != 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col justify-between gap-20 max-w-7xl mx-auto`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className='relative flex-1 lg:my-0 my-32'>
              <Image src={item.img} width={600} alt={item.title} className='h-max absolute top-1/2 left-1/2 -translate-1/2 object-cover lg:scale-120 scale-100' />
              <h2 className={`lg:text-7xl md:text-5xl text-3xl inline-block w-[400px] text-center font-bold ${item.title === 'Brand Essence' ? "text-white" : item.title === 'ملامح من ضوء' ? "text-white" : "text-prussian-blue"} absolute top-1/2 left-1/2 -translate-1/2 z-20`}>{item.title}</h2>
            </div>
            <div className={`flex flex-col gap-8 flex-1 ${lang === 'ar' ? 'text-right' : 'text-left items-start'}`}>

              <p className='lg:text-2xl text-md font-regular text-gray-800'>{item.description}</p>
              {/* {item.desc2 && <p className='lg:text-xl text-md font-medium text-gray-800 '>{item.desc2}</p>} */}
              <ul className='list-disc'>
                {item.list.map((listItem, index) => (
                  <li key={index} className={`text-gray-800 mb-2 mx-4 lg:text-xl text-md ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    {listItem}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Services