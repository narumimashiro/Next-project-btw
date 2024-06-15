import styles from './RadioGroup.module.scss'

type RadioOptions = {
  label: string
  value: string
}

export type RadioGroupProps = {
  colorTheme?: 'light' | 'dark'
  radioType?: 'column' | 'row'
  radioProps?: string
  name: string
  optionList: RadioOptions[]
  currentValue: string
  onChange: (value: string) => void
}

export const RadioGroup = ({
  colorTheme = 'light',
  radioType = 'row',
  radioProps,
  name,
  optionList,
  currentValue,
  onChange
}: RadioGroupProps) => {
  return (
    <div className={styles['radio-wrap']} style={{ flexDirection: radioType }}>
      {optionList.map((radioEl) => {
        return (
          <label key={radioEl.value} className={`${styles['radio-items']} ${radioProps}`}>
            <input
              type="radio"
              name={name}
              value={radioEl.value}
              checked={radioEl.value === currentValue}
              onChange={() => onChange(radioEl.value)}
            />
            <span className={styles[`checkmark-${colorTheme}`]}></span>
            <span className={styles[`radio-label-${colorTheme}`]}>{radioEl.label}</span>
          </label>
        )
      })}
    </div>
  )
}
