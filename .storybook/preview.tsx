import React from 'react'
import { RecoilRoot } from 'recoil'
import { Preview } from '@storybook/react'
import '@/styles/globals.scss'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { I18nextProvider } from 'react-i18next'
import '@/locales/config'
import { useTranslation } from 'next-i18next'

import { CustomProvider } from '@/components/customProvider'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    text: {
      primary: '#FFFFFF'
    }
  }
})

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: '#000000'
    }
  }
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story, context) => {
      const theme = context.parameters.backgrounds.default === 'dark' ? darkTheme : lightTheme
      const { i18n } = useTranslation()

      return (
        <RecoilRoot>
          <I18nextProvider i18n={i18n}>
            <CustomProvider>
              <ThemeProvider theme={theme}>
                <div
                  style={{
                    minWidth: '390px',
                    width: '50vw',
                    minHeight: '250px',
                    height: '39svh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    color: theme.palette.text.primary
                  }}>
                  <Story />
                </div>
              </ThemeProvider>
            </CustomProvider>
          </I18nextProvider>
        </RecoilRoot>
      )
    }
  ]
}

export default preview
