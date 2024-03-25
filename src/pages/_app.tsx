import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import { appWithTranslation, useTranslation } from 'next-i18next'
import '@/locales/config'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import '@/styles/globals.sass'

import Layout from '@/components/layout'

import { useLocaleSlug, I18NEXT_LOCALE } from '@/hooks/useLocaleSlug'
import { useThemeStyle } from '@/hooks/useThemeStyle'

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  }
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const App = ({ Component, pageProps }: AppProps) => {

  const theme = useThemeStyle()
  const selectedTheme = theme ? darkTheme : lightTheme
  const locale = useLocaleSlug()
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(locale)
    localStorage.setItem(I18NEXT_LOCALE, locale)
  }, [i18n, locale])

  return (
    <RecoilRoot>
      <ThemeProvider theme={selectedTheme}>
        <CssBaseline />
        <Layout>
          <Component { ...pageProps } />
        </Layout>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default appWithTranslation(App)