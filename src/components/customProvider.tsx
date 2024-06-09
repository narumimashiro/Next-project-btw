import { createContext, useContext, useMemo } from 'react'

import { ORIENTATION, useOrientation, useTabletSize } from '@/hooks/useWindowSize'

export type CustomContextType = {
  isPortrait: boolean
  isTabletSize: boolean
}

const CustomContext = createContext<CustomContextType | null>(null)

export const CustomProvider = ({ children }: { children: React.ReactNode }) => {

  const orientation = useOrientation()
  const isPortrait = useMemo(() => ORIENTATION.PORTRAIT.HARD == orientation, [orientation])
  const isTabletSize = useTabletSize()

  const providerValue = {
    isPortrait,
    isTabletSize
  }

  return (
    <CustomContext.Provider value={providerValue}>
      { children }
    </CustomContext.Provider>
  )
}

export const useCustomContext = (): CustomContextType => {
  const context = useContext(CustomContext)
  if(!context) {
    throw new Error('useCustomContext must be used within a CustomProvider')
  }
  return context
}