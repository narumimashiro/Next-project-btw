import React from 'react'

import { useTheme } from '@mui/material'

import styles from './StrongButton.module.scss'

export type StrongButtonProps = {
  className?: string
  children?: React.ReactNode
  colorTheme?: 'light' | 'dark'
  disabled?: boolean
  onClick: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const StrongButton = ({
  className = '',
  colorTheme,
  children,
  disabled,
  onClick,
  ...buttonProps
}: StrongButtonProps) => {
  const theme = useTheme()
  const color = colorTheme ? colorTheme : theme.palette.mode

  return (
    <button
      className={`${styles[`BTW_strongButton-${color}`]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...buttonProps}>
      {children}
    </button>
  )
}
