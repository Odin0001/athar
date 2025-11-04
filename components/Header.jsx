'use client'
import { useTranslation } from '@/components/LanguageProvider'
import Orb from "@/components/Orb";
import ShinyText from "@/components/ShinyText";

const Header = () => {

  const { t } = useTranslation()

  return (
    <header style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* <DarkVeil backgroundColor="#000" speed={3} /> */}
      <Orb
        hoverIntensity={0.5}
        rotateOnHover={true}
        hue={90}
        forceHoverState={false}
      >
        <div className="flex flex-col items-center justify-center gap-4 text-center w-full h-full">
          {/* <h1 className="text-white text-6xl font-bold mb-4">
              Some Random Text Here
            </h1> */}
          <ShinyText
            text={t('home.headerTitle')}
            className="md:text-9xl text-6xl uppercase font-bold"
          />
          <p className="text-gray-300 text-md italic max-w-7xl">{t('home.firstSection.firstSentence')}</p>
          <p className="text-gray-300 text-md italic max-w-7xl">{t('home.firstSection.secondSentence')}</p>
        </div>
      </Orb>
    </header>
  );
};

export default Header;
