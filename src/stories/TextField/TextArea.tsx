import { useState } from 'react'
import { useTheme } from '@mui/material'

import styles from './TextArea.module.scss'

export type TextAreaProps = {
  className?: string
  width?: number | string
  height?: number | string
  colorTheme?: 'light' | 'dark'
  disabled?: boolean
  placeholder?: string
  onSetContext?: (context: string) => void
}

export const TextArea = ({
  className = '',
  width,
  height,
  colorTheme,
  disabled = false,
  placeholder = '',
  onSetContext
}: TextAreaProps) => {
  const theme = useTheme().palette.mode
  const color = colorTheme ? colorTheme : theme
  const [context, setContext] = useState('')

  const handleInputValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value
    setContext(newValue)
    if (onSetContext) onSetContext(newValue)
  }

  const textAreaStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height
  }

  return (
    <textarea
      className={`invisible-scroll ${styles[`BTW_text-area-${color}`]} ${className}`}
      style={textAreaStyle}
      disabled={disabled}
      placeholder={placeholder}
      onChange={handleInputValue}
      value={context}
    />
  )
}
