/**
 * [Custom hook]
 * get windows size portrait or landscape
 */

/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'

const VIEW_BREAKPOINT_PORTRAIT = 768
const VIEW_BREAKPOINT_TABLET = 1280

export const ORIENTATION = {
  PORTRAIT: 'PORTRAIT',
  LANDSCAPE: 'LANDSCAPE'
}

export const useInnerSize = () => {
  if (typeof window === 'undefined' || typeof document?.documentElement === 'undefined') {
    return 0
  }

  const [windowSize, setWindowSize] = useState(() => {
    return Math.min(document.documentElement.clientWidth, window.innerWidth)
  })

  const handlerResize = () => {
    setWindowSize(Math.min(document.documentElement.clientWidth, window.innerWidth))
  }

  useEffect(() => {
    handlerResize()
    window.addEventListener('resize', handlerResize)

    return () => {
      window.removeEventListener('resize', handlerResize)
    }
  }, [])

  return windowSize
}

export const useOrientation = () => {
  const windowSize = useInnerSize()
  return windowSize <= VIEW_BREAKPOINT_PORTRAIT ? ORIENTATION.PORTRAIT : ORIENTATION.LANDSCAPE
}

export const useTabletSize = () => {
  const windowSize = useInnerSize()
  return windowSize >= VIEW_BREAKPOINT_PORTRAIT && windowSize < VIEW_BREAKPOINT_TABLET
}
