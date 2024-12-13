import { useTheme } from '@mui/material'

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
  colorTheme,
  radioType = 'row',
  radioProps,
  name,
  optionList,
  currentValue,
  onChange
}: RadioGroupProps) => {
  const theme = useTheme()
  const color = colorTheme ? colorTheme : theme.palette.mode

  return (
    <div className={styles['BTW_radio-wrap']} style={{ flexDirection: radioType }}>
      {optionList.map((radioEl) => {
        return (
          <label key={radioEl.value} className={`${styles['BTW_radio-items']} ${radioProps}`}>
            <input
              type="radio"
              name={name}
              value={radioEl.value}
              checked={radioEl.value === currentValue}
              onChange={() => onChange(radioEl.value)}
            />
            <span className={styles[`BTW_checkmark-${color}`]}></span>
            <span className={styles[`BTW_radio-label-${color}`]}>{radioEl.label}</span>
          </label>
        )
      })}
    </div>
  )
}
