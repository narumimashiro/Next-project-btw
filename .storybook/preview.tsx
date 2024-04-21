import React from 'react'
import { Preview } from '@storybook/react'
import '@/styles/globals.scss'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { I18nextProvider } from 'react-i18next'
import '@/locales/config'
import { useTranslation } from 'next-i18next'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
  },
  decorators: [
    (Story, context) => {
      
      const theme = context.parameters.theme === 'dark' ? darkTheme : lightTheme
      const { i18n } = useTranslation()

      return (
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <div style={{
              minWidth: '390px',
              width: '50vw',
              minHeight: '250px',
              height: '39svh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            >
              <Story />
            </div>
          </ThemeProvider>
        </I18nextProvider>
      )
    },
  ],
}

export default preview