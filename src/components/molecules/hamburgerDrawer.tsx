import React, { useState } from 'react'

import { useTheme } from '@mui/material'

import styles from '@/styles/molecules/HamburgerDrawer.module.scss'

import { Drawer } from '@/stories/Drawer/Drawer'

export type HamburgerDrawerProps = {
  children: React.ReactNode
}
export const HamburgerDrawer = ({ children }: HamburgerDrawerProps) => {
  const theme = useTheme()
  const colorTheme = theme.palette.mode
  const [openMenu, setOpenMenu] = useState(false)

  const renderChildrenWithClose = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return (
        <div role="button" onClick={() => setOpenMenu(false)}>
          {child}
        </div>
      )
    }
    return child
  })

  return (
    <>
      <button className={`${styles.hamburgerButton}`} onClick={() => setOpenMenu(!openMenu)}>
        <span className={`${openMenu ? styles.open : ''}`}></span>
        <span className={`${openMenu ? styles.open : ''}`}></span>
        <span className={`${openMenu ? styles.open : ''}`}></span>
      </button>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} colorTheme={colorTheme}>
        <div className={styles.menuContainer}>{renderChildrenWithClose}</div>
      </Drawer>
    </>
  )
}
