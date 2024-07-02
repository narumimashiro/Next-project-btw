import React from 'react'
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
  colorTheme = 'light',
  children,
  disabled,
  onClick,
  ...buttonProps
}: StrongButtonProps) => {
  return (
    <button
      className={`${styles[`strongButton-${colorTheme}`]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...buttonProps}>
      {children}
    </button>
  )
}
