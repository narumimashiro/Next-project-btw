import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import { appWithTranslation, useTranslation } from 'next-i18next'
import '@/locales/config'

import '@/styles/globals.scss'

import React from 'react'
import { LayoutWithMenu } from '@/components/layout'
import { CustomProvider } from '@/components/customProvider'

import { useLocaleSlug, I18NEXT_LOCALE } from '@/hooks/useLocaleSlug'

const App = ({ Component, pageProps }: AppProps) => {
  const locale = useLocaleSlug()
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(locale)
    localStorage.setItem(I18NEXT_LOCALE, locale)
  }, [i18n, locale])

  return (
    <RecoilRoot>
      <React.StrictMode>
        <CustomProvider>
          <LayoutWithMenu>
            <Component {...pageProps} />
          </LayoutWithMenu>
        </CustomProvider>
      </React.StrictMode>
    </RecoilRoot>
  )
}

export default appWithTranslation(App)
