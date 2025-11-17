'use client'
import dummy from '@/public/dummy.jpg'
import Image from 'next/image'
import { useTranslation } from '@/components/LanguageProvider'
import { List } from 'lucide-react'

const Services = () => {
  
  const { t } = useTranslation()

  const data = [
    {
      title: t('services.firstSection.title'),
      description: t('services.firstSection.firstSentence'),
      desc2: t('services.firstSection.secondSentence'),
      list: [
        t('services.firstSection.list.item1'),
        t('services.firstSection.list.item2'),
        t('services.firstSection.list.item3'),
        t('services.firstSection.list.item4'),
      ],
      img: dummy
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
      img: dummy
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
      img: dummy
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
              <h2 className='text-7xl font-bold text-white py-4 w-max relative'>
                {item.title}
                <hr className='absolute bottom-0 left-0 w-full bg-white text-white border border-white' />
              </h2>
              <p className='text-3xl font-semibold text-gray-200'>{item.description}</p>
              {item.desc2 && <p className='text-xl font-medium text-gray-200'>{item.desc2}</p>}
              <ul>
                {item.list.map((listItem, index) => (
                  <li key={index} className='text-white mb-2'>
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