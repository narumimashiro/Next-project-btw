/**
 * [Custom hook]
 * get theme light mode or dark mode
 */

import { useEffect, useState } from 'react'
import { atom, useRecoilState } from 'recoil'

const LOCALSTORAGE_COLOR_THEME = 'color_theme'
export const LIGHT_MODE = 'light'
export const DARK_MODE = 'dark'
export const CUSTOM_MODE = 'custom'
export type ColorTheme = typeof LIGHT_MODE | typeof DARK_MODE | typeof CUSTOM_MODE

export const useThemeStyle = () => {
  const [isDarkMode, setDarkMode] = useState(false)

  // detected dark mode by media query
  const darkModeQuery =
    typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null

  const darkModeChangeListener = (event: MediaQueryListEvent) => {
    setDarkMode(event.matches)
  }

  useEffect(() => {
    if (darkModeQuery) {
      // init
      setDarkMode(darkModeQuery.matches)

      // watch media query changing
      darkModeQuery.addEventListener('change', darkModeChangeListener)

      // cleanup event listener if unmounted component
      return () => {
        darkModeQuery.removeEventListener('change', darkModeChangeListener)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isDarkMode
}

export const userColorThemeState = atom<ColorTheme | null>({
  key: 'user color theme',
  default: null
})

export const useUserColorTheme = () => {
  const [userColorTheme, setUserColorTheme] = useRecoilState(userColorThemeState)
  const isCustomColorModeDark = useThemeStyle()

  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    setUserColorTheme(isCustomColorModeDark ? DARK_MODE : LIGHT_MODE)
  }

  useEffect(() => {
    const storageValue = localStorage.getItem(LOCALSTORAGE_COLOR_THEME)
    if (storageValue !== null) {
      setUserColorTheme(storageValue as ColorTheme)
    } else {
      setUserColorTheme(isCustomColorModeDark ? DARK_MODE : LIGHT_MODE)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setColorTheme = (color: ColorTheme) => {
    switch (color) {
      case LIGHT_MODE:
        setUserColorTheme(LIGHT_MODE)
        localStorage.setItem(LOCALSTORAGE_COLOR_THEME, LIGHT_MODE)
        break
      case DARK_MODE:
        setUserColorTheme(DARK_MODE)
        localStorage.setItem(LOCALSTORAGE_COLOR_THEME, DARK_MODE)
        break
      case CUSTOM_MODE: // FALL THROUGH
      default:
        setUserColorTheme(isCustomColorModeDark ? DARK_MODE : LIGHT_MODE)
        localStorage.removeItem(LOCALSTORAGE_COLOR_THEME)
        break
    }
  }

  return { userColorTheme, setColorTheme }
}
