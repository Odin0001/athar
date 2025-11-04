'use client'
import Image from "next/image";
import ScrollStack, { ScrollStackItem } from './ScrollStack'
import { useTranslation } from '@/components/LanguageProvider'
import dummy from '@/public/dummy.jpg'

const StackedSection = () => {
  
  const { t } = useTranslation()
  
  return (
    <div className="w-full h-screen bg-red-500">
      <ScrollStack>
        <ScrollStackItem itemClassName="overflow-hidden">
          <Image
            src={dummy}
            fill
            className="absolute -z-10 object-cover"
            alt="slide 1"
          />
          <p className="text-xl text-center">
            {t('home.firstSection.firstSentence')}
          </p>
        </ScrollStackItem>
        <ScrollStackItem itemClassName="overflow-hidden">
          <Image
            src={dummy}
            fill
            className="absolute -z-10 object-cover"
            alt="slide 1"
          />
          <p className="text-xl text-center">
            {t('home.firstSection.secondSentence')}
          </p>
        </ScrollStackItem>
      </ScrollStack>
      {/* <div className="w-full h-screen bg-blue-500"></div> */}
    </div>
  );
};

export default StackedSection;
