import { useTheme } from '@mui/material'

import styles from './Checkbox.module.scss'

export type CheckboxProps = {
  colorTheme?: 'light' | 'dark'
  className?: string
  isChecked: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
  filling?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export const Checkbox = ({
  colorTheme,
  className = '',
  isChecked,
  onChange,
  disabled,
  filling,
  ...inputProps
}: CheckboxProps) => {
  const theme = useTheme()
  const color = colorTheme ? colorTheme : theme.palette.mode

  return (
    <label
      className={styles['BTW_checkbox-wrap']}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onChange(!isChecked)
          e.preventDefault()
        }
      }}>
      <label
        className={`
        ${styles[`BTW_checkbox-${color}`]}
        ${filling ? styles.BTW_filling : ''}
        ${isChecked ? styles.BTW_checked : ''}
        ${disabled ? styles.BTW_disabled : ''}
        ${className}`}>
        <input
          type="checkbox"
          role="checkbox"
          checked={isChecked}
          disabled={disabled}
          onChange={() => onChange(!isChecked)}
          aria-checked={isChecked}
          {...inputProps}
        />
      </label>
    </label>
  )
}
