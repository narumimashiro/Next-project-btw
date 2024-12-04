import React, { useMemo } from 'react'
import { useTheme } from '@mui/material'

import { useInnerSize } from '@/hooks/useWindowSize'

import styles from './Menu.module.scss'

export const MenuContext = React.createContext<{
  handleCloseMenu: () => void
  anchorEl: HTMLElement | null
} | null>(null)

export type MenuProps = {
  children: React.ReactNode
  colorTheme?: 'light' | 'dark'
  anchorEl: HTMLElement | null
  handleReleaseAnchor: () => void
}

export const Menu = ({ children, colorTheme, anchorEl, handleReleaseAnchor }: MenuProps) => {
  const windowSize = useInnerSize()
  const theme = useTheme()
  const color = colorTheme ? colorTheme : theme.palette.mode

  const onCloseMenu = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    handleReleaseAnchor()
  }

  const containerPos = useMemo(() => {
    if (!anchorEl) return

    const rect = anchorEl.getBoundingClientRect()
    return {
      top: rect.bottom,
      left: rect.right,
      transform: 'translate(-100%, 0)'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl, windowSize])

  const propsValue = useMemo(
    () => ({
      handleCloseMenu: handleReleaseAnchor,
      anchorEl
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [anchorEl]
  )

  return (
    <MenuContext.Provider value={propsValue}>
      <div
        className={`${styles.BTW_fullScreen} ${anchorEl ? styles.BTW_visible : styles.BTW_hidden}`}
        onClick={onCloseMenu}>
        <div
          className={`invisible-scroll ${styles.BTW_container} ${styles[color]}`}
          style={containerPos}
          onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </MenuContext.Provider>
  )
}
