import { useRouter } from 'next/router'

import { I18NEXT_LOCALE } from '@/hooks/useLocaleSlug'

const { language }: { language: string[] } = require('@/locales/config')

export const useRedirectUrl = () => {
  const router = useRouter()

  const redirectUrl = () => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const localStorageLanguage = localStorage.getItem(I18NEXT_LOCALE)
      const rootLocale = navigator.language

      const locale =
        (localStorageLanguage || language.find((lang) => lang.split('-')[0] === rootLocale)) ??
        language[0]

      router.push(`/${locale}`)
    }
  }

  return { redirectUrl }
}
