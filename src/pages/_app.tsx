import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import { RecoilRoot } from 'recoil'

import { appWithTranslation, useTranslation } from 'next-i18next'
import '@/locales/config'

import { CustomProvider } from '@/components/customProvider'
import { LayoutWithMenu } from '@/components/layout'
import { useLocaleSlug, I18NEXT_LOCALE } from '@/hooks/useLocaleSlug'

import '@/styles/globals.scss'

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
