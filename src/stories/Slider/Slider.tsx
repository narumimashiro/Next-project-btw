import { useState } from 'react'
import { useTheme, Slider as MuiSlider } from '@mui/material'

export type SliderProps = {
  colorTheme?: 'light' | 'dark'
  min: number
  max: number
  step?: number
  defaultValue?: number
  dispValue?: boolean
  onChange: (value: number) => void
  ariaLable?: string
}

export const Slider = ({
  colorTheme,
  min,
  max,
  step = 1,
  defaultValue,
  dispValue,
  onChange,
  ariaLable
}: SliderProps) => {
  const theme = useTheme().palette.mode
  const color = colorTheme ? colorTheme : theme
  const isDark = color === 'dark'
  const customTheme = {
    color: isDark ? '#ffffff' : '#000000',
    '& .MuiSlider-thumb': {
      '&:hover, &.Mui-focusVisible': {
        boxShadow: `0px 0px 0px 6px ${isDark ? 'rgba(255, 255, 255, 0.39)' : 'rgba(0, 0, 0, 0.25)'}`
      }
    },
    '& .MuiSlider-valueLabel': {
      color: `${isDark ? '#000000' : '#ffffff'}`,
      backgroundColor: `${isDark ? '#d3d3d3' : '#a9a9a9'}`,
      padding: '2.5px 5px'
    }
  }

  const [value, setValue] = useState(() => {
    return defaultValue ? defaultValue : (max + min) / 2
  })

  const handleChange = (_e: Event, newValue: number | number[]) => {
    setValue(newValue as number)
    onChange(newValue as number)
  }

  return (
    <MuiSlider
      size="small"
      sx={customTheme}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={handleChange}
      valueLabelDisplay={dispValue ? 'on' : 'off'}
      aria-labelledby={ariaLable ? ariaLable : 'custom_slider'}
    />
  )
}
