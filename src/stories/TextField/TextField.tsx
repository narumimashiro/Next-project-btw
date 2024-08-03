import { useState } from 'react'

import { useTheme } from '@mui/material'

import clearLight from '@/img/light/clear.svg'
import clearDark from '@/img/dark/clear.svg'

import styles from './TextField.module.scss'

export type TextFieldProps = {
  className?: string
  colorTheme?: 'light' | 'dark'
  placeholder?: string
  onChangeInput: (value: string) => void
  maxLength?: number
  clearButton?: boolean
  isError?: boolean
  errorString?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const TextField = ({
  className = '',
  colorTheme,
  placeholder = '',
  onChangeInput,
  maxLength,
  clearButton = false,
  isError,
  errorString,
  ...inputProps
}: TextFieldProps) => {
  const theme = useTheme().palette.mode
  const color = colorTheme ? colorTheme : theme
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeInput(e.target.value)
    setInputValue(e.target.value)
  }

  const clearInputText = () => {
    setInputValue('')
    onChangeInput('')
  }

  return (
    <div className={`${styles.textfield} ${className}`}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          {...inputProps}
          className={`${styles[`input-${color}`]} ${isError ? styles.inputError : ''}`}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={handleInputChange}
          value={inputValue}
        />
        {clearButton && (
          <button
            className={`${styles.clearBtn} ${styles[color]}`}
            onClick={clearInputText}
            aria-label="clear_text"
            aria-labelledby="clear_text">
            <img src={color === 'light' ? clearLight.src : clearDark.src} alt="" />
          </button>
        )}
      </div>
      {isError && <p className={styles.errorText}>{errorString}</p>}
    </div>
  )
}
