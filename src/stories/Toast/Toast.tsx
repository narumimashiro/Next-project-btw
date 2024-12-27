import { useEffect } from 'react'

import { useTheme } from '@mui/material'

import closeDark from '@/img/dark/clear.svg'
import closeLight from '@/img/light/clear.svg'

import styles from './Toast.module.scss'

export type ToastProps = {
  open: boolean
  onClose: () => void
  colorTheme?: 'light' | 'dark'
  message: string
  pos?: 'top' | 'bottom'
  isError?: boolean
}

export const Toast = ({
  open,
  onClose,
  colorTheme,
  message,
  pos = 'bottom',
  isError = false
}: ToastProps) => {
  const theme = useTheme().palette.mode
  const color = colorTheme ? colorTheme : theme

  useEffect(() => {
    if (!open) return

    const timer = setTimeout(() => {
      onClose()
    }, 1000 * 5)

    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <div
      className={`${styles[`BTW_toast-${pos}`]} ${open ? styles.BTW_open : ''} ${styles[color]}`}>
      <p className={isError ? styles.BTW_error : ''}>{message}</p>
      <button className={`button-${color} ${styles['BTW_close-button']}`} onClick={onClose}>
        <img src={color === 'light' ? closeDark.src : closeLight.src} alt="" />
      </button>
    </div>
  )
}
