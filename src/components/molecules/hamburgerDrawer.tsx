import React, { useState } from 'react'

import { useTheme } from '@mui/material'

import styles from '@/styles/molecules/HamburgerDrawer.module.scss'

import { fireOnEnterKey } from '@/lib/utils'

import { Drawer } from '@/stories/Drawer/Drawer'

export type HamburgerDrawerProps = {
  children: React.ReactNode
}
export const HamburgerDrawer = ({ children }: HamburgerDrawerProps) => {
  const theme = useTheme()
  const colorTheme = theme.palette.mode
  const [openMenu, setOpenMenu] = useState(false)

  const closeMenu = () => setOpenMenu(false)

  const renderChildrenWithClose = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return (
        <div
          role="button"
          tabIndex={0}
          onClick={closeMenu}
          onKeyDown={fireOnEnterKey(closeMenu)}>
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
