import { useTheme } from '@mui/material'

import { fireOnEnterKey } from '@/lib/utils'

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

  const handleChange = () => {
    onChange(!isChecked)
  }

  return (
    <div
      className={styles['BTW_checkbox-wrap']}
      role="checkbox"
      tabIndex={0}
      aria-label="checkbox"
      aria-checked={isChecked}
      onKeyDown={fireOnEnterKey(handleChange)}>
      <label
        className={`
        ${styles[`BTW_checkbox-${color}`]}
        ${filling ? styles.BTW_filling : ''}
        ${isChecked ? styles.BTW_checked : ''}
        ${disabled ? styles.BTW_disabled : ''}
        ${className}`}>
        <input
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
          onKeyDown={fireOnEnterKey(handleChange)}
          onChange={() => onChange(!isChecked)}
          aria-checked={isChecked}
          {...inputProps}
        />
      </label>
    </div>
  )
}
