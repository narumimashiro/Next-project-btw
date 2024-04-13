import React from 'react'
import styles from './BasicButton.module.scss'

export type BasicButtonProps = {
  className?: string
  children?: React.ReactNode
  colorTheme?: 'light' | 'dark'
  disabled?: boolean
  onClick: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const BasicButton = ({
  className,
  colorTheme = 'light',
  children,
  disabled,
  onClick,
  ...buttonProps
}: BasicButtonProps) => {

  return (
    <button
      className={`${styles[`basicButton-${colorTheme}`]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...buttonProps}
    >
      { children }
    </button>
  )
}