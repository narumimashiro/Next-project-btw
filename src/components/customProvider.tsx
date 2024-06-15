/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

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

  return <CustomContext.Provider value={providerValue}>{children}</CustomContext.Provider>
}

export const useCustomContext = (): CustomContextType => {
  const context = useContext(CustomContext)
  if (!context) {
    throw new Error('useCustomContext must be used within a CustomProvider')
  }
  return context
}
