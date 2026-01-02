'use client'
import { useEffect } from 'react'
import { useTranslation } from '@/components/LanguageProvider'

export default function FontController({ montserratClassName, alexandriaClassName }) {
  const { lang } = useTranslation()

  useEffect(() => {
    // Remove both font classes and add the appropriate one based on language
    document.body.classList.remove(montserratClassName, alexandriaClassName)
    
    if (lang === 'ar') {
      document.body.classList.add(alexandriaClassName)
    } else {
      document.body.classList.add(montserratClassName)
    }
  }, [lang, montserratClassName, alexandriaClassName])

  return null
}

