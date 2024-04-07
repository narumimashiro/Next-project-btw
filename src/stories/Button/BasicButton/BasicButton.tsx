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
      className={`
        ${disabled ? `button-disabled-${colorTheme}` : `button-active-${colorTheme}`}
        ${styles.basicButton}
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
      {...buttonProps}
    >
      { children }
    </button>
  )
}