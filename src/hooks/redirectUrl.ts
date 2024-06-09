import { language } from '@/locales/config'

export const redirectUrl = () => {

  if (typeof window !== "undefined" && typeof navigator !== "undefined") {
    const rootLocale = navigator.language

    const locale = language.find(
      lang => lang.split('-')[0] === rootLocale
    ) ?? language[0]

    location.assign(`/${locale}`)
  }
}