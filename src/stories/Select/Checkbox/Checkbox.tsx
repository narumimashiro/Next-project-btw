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
  colorTheme = 'light',
  className,
  isChecked,
  onChange,
  disabled,
  filling,
  ...inputProps
}: CheckboxProps) => {

  return (
    <label 
      className={styles[`checkbox-wrap-${colorTheme}`]}
      tabIndex={0}
      onKeyDown={(e) => {
        if(e.key === 'Enter') {
          onChange(!isChecked)
          e.preventDefault()
        }
      }}
    >
      <label className={`
        ${styles[`checkbox-${colorTheme}`]}
        ${filling ? styles.filling : ''}
        ${isChecked ? styles.checked : ''}
        ${disabled ? styles.disabled : ''}
        ${className ? className : ''}`}
      >
        <input
          type='checkbox'
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