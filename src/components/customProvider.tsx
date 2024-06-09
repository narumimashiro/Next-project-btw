import { createContext, useContext } from 'react'

import { useOrientation, useTabletSize } from '@/hooks/useWindowSize'

export type CustomContextType = {
  orientation: string
  isTabletSize: boolean
}

const CustomContext = createContext<CustomContextType | null>(null)

export const CustomProvider = ({ children }: { children: React.ReactNode }) => {

  const orientation = useOrientation()
  const isTabletSize = useTabletSize()

  const providerValue = {
    orientation,
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