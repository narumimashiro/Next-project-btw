import { useTheme } from '@mui/material'

import styles from './Drawer.module.scss'

export type DrawerProps = {
  open: boolean
  children: React.ReactNode
  colorTheme?: 'light' | 'dark'
  pos: 'right' | 'left' | 'top' | 'bottom'
  onClose: () => void
}

export const Drawer = ({ open, children, colorTheme, pos = 'right', onClose }: DrawerProps) => {
  const theme = useTheme().palette.mode
  const color = colorTheme ? colorTheme : theme

  return (
    <>
      <div className={`${styles.BTW_fullscreen} ${open ? styles.BTW_open : ''}`}>
        <div
          className={`${styles[`BTW_overlay-${color}`]} ${open ? styles.BTW_open : ''}`}
          onClick={onClose}
        />
        <div
          className={`${styles[`BTW_wrap-drawer-${pos}`]} ${styles[color]} ${open ? styles.BTW_open : ''}`}>
          {children}
        </div>
      </div>
    </>
  )
}
