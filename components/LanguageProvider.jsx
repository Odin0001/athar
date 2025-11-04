'use client'
import { createContext, useContext, useState } from 'react'
import en from '../locales/en.json'
import ar from '../locales/ar.json'

const translations = { en, ar }

const LanguageContext = createContext()

const getDeepValue = (obj, path) => {
  // Split the path string (e.g., 'nav.home') into an array of keys (e.g., ['nav', 'home'])
  const keys = path.split('.')

  // Use reduce to traverse the object. The initial value for the accumulator is the obj itself.
  return keys.reduce((current, key) => {
    // If current is null or undefined, stop and return undefined.
    return current && current[key] !== undefined ? current[key] : undefined
  }, obj)
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')

  const t = (key) => {
    const currentTranslations = translations[lang]
    // Use the helper to get the deep value
    return getDeepValue(currentTranslations, key) || key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useTranslation = () => useContext(LanguageContext)
