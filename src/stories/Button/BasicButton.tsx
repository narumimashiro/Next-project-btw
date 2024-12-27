import React from 'react'

import { useTheme } from '@mui/material'

import styles from './BasicButton.module.scss'

export type BasicButtonProps = {
  className?: string
  children?: React.ReactNode
  colorTheme?: 'light' | 'dark'
  disabled?: boolean
  onClick: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const BasicButton = ({
  className = '',
  colorTheme,
  children,
  disabled,
  onClick,
  ...buttonProps
}: BasicButtonProps) => {
  const theme = useTheme()
  const color = colorTheme ? colorTheme : theme.palette.mode

  return (
    <button
      className={`${styles[`BTW_basicButton-${color}`]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...buttonProps}>
      {children}
    </button>
  )
}
