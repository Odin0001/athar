'use client'
import LogoLoop from '@/components/LogoLoop'
import { useTranslation } from '@/components/LanguageProvider'

const ClientLogos = ({ logos }) => {
  const { t } = useTranslation()

  if (logos.length === 0) return null

  return (
    <section className='w-full bg-white py-20'>
      <h2 className='text-center text-prussian-blue lg:text-4xl text-2xl font-bold mb-12 px-4'>
        {t('home.logosTitle')}
      </h2>
      <LogoLoop
        logos={logos.map((logo) => ({ src: logo.image_url, alt: '' }))}
        speed={80}
        direction='left'
        logoHeight={64}
        gap={80}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor='#ffffff'
        ariaLabel={t('home.logosTitle')}
      />
    </section>
  )
}

export default ClientLogos
