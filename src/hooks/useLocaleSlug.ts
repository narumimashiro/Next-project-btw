/**
 * [Custom hook]
 * get router query locale
 */

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export const VALID_LOCALE = ['ja-jp', 'en-us']
export const I18NEXT_LOCALE = 'i18next_locale'
export const LOCALE = {
  JAPANESE: { DEFAULT: 'ja', URL_LOCALE: 'ja-jp' },
  ENGLISH: { DEFAULT: 'en', URL_LOCALE: 'en-us' }
}

export const useLocaleSlug = () => {
  const [i18nextLocale, setI18nextLocale] = useState(LOCALE.JAPANESE.URL_LOCALE)
  const router = useRouter()
  const { locale_slug } = router.query

  useEffect(() => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      setI18nextLocale((locale_slug as string) || LOCALE.JAPANESE.URL_LOCALE)
    } else {
      const localStorageLanguage = localStorage.getItem(I18NEXT_LOCALE)
      setI18nextLocale(localStorageLanguage || LOCALE.JAPANESE.URL_LOCALE)
    }
  }, [locale_slug])

  return i18nextLocale
}

export const useDefaultLocale = () => {
  const [defaultLocale, setDefaultLocale] = useState(LOCALE.JAPANESE.DEFAULT)

  useEffect(() => {
    setDefaultLocale(window.navigator.language)
  }, [])

  return defaultLocale
}

export const useRouterLocale = () => {
  const router = useRouter()
  const localeSlug = useLocaleSlug()

  const routerNewUrl = (locale: string) => {
    const { ...queries } = router.query
    const updatedQuery = {
      ...queries,
      locale_slug: locale
    }
    router.push({ query: updatedQuery })
    localStorage.setItem(I18NEXT_LOCALE, locale)
  }

  return { localeSlug, routerNewUrl }
}
