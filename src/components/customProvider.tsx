/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import {
  CUSTOM_MODE,
  DARK_MODE,
  LIGHT_MODE,
  useThemeStyle,
  useUserColorTheme
} from '@/hooks/useThemeStyle'
import { ORIENTATION, useInnerSize, useOrientation, useTabletSize } from '@/hooks/useWindowSize'

export type CustomContextType = {
  isPortrait: boolean
  isTabletSize: boolean
}

const CustomContext = createContext<CustomContextType | null>(null)

export const CustomProvider = ({ children }: { children: React.ReactNode }) => {
  const windowInnerWidth = useInnerSize()
  const orientation = useOrientation()
  const isPortrait = useMemo(() => ORIENTATION.PORTRAIT == orientation, [orientation])
  const isTabletSize = useTabletSize()

  const [windowSize, setWindowSize] = useState<number | null>(null)

  useEffect(() => {
    setWindowSize(windowInnerWidth)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (windowSize === null) return

  const providerValue = {
    isPortrait,
    isTabletSize
  }

  return (
    <CustomContext.Provider value={providerValue}>
      <MuiThemeProvider>{children}</MuiThemeProvider>
    </CustomContext.Provider>
  )
}

export const useCustomContext = (): CustomContextType => {
  const context = useContext(CustomContext)
  if (!context) {
    throw new Error('useCustomContext must be used within a CustomProvider')
  }
  return context
}

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const lightTheme = createTheme({
    palette: {
      mode: LIGHT_MODE,
      background: {
        default: '#ffffff'
      },
      text: {
        primary: '#000000'
      }
    }
  })

  const darkTheme = createTheme({
    palette: {
      mode: DARK_MODE,
      background: {
        default: '#000000'
      },
      text: {
        primary: '#ffffff'
      }
    }
  })

  const { userColorTheme } = useUserColorTheme()
  const isCustomColorModeDark = useThemeStyle()
  const selectedTheme = useMemo(() => {
    if (CUSTOM_MODE === userColorTheme) {
      return isCustomColorModeDark ? darkTheme : lightTheme
    } else if (LIGHT_MODE === userColorTheme) {
      return lightTheme
    } else {
      return darkTheme
    }
  }, [darkTheme, isCustomColorModeDark, lightTheme, userColorTheme])

  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
