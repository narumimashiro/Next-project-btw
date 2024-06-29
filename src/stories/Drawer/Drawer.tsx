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
      <div className={`${styles.fullscreen} ${open ? styles.open : ''}`}>
        <div
          className={`${styles[`overlay-${color}`]} ${open ? styles.open : ''}`}
          onClick={onClose}
        />
        <div
          className={`${styles[`wrap-drawer-${pos}`]} ${styles[color]} ${open ? styles.open : ''}`}>
          {children}
        </div>
      </div>
    </>
  )
}
