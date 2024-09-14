import { useState } from 'react'
import { useTheme } from '@mui/material'

import styles from './TextArea.module.scss'

export type TextAreaProps = {
  className?: string
  width?: number | string
  height?: number | string
  colorTheme?: 'light' | 'dark'
  placeholder?: string
  onSetContext?: (context: string) => void
}

export const TextArea = ({
  className = '',
  width,
  height,
  colorTheme,
  placeholder = '',
  onSetContext
}: TextAreaProps) => {
  const theme = useTheme().palette.mode
  const color = colorTheme ? colorTheme : theme
  const [context, setContext] = useState('')

  const handleInputValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value || ''
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
      placeholder={placeholder}
      onChange={handleInputValue}>
      {context}
    </textarea>
  )
}
