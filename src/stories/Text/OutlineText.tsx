import { useTheme } from '@mui/material'
import styles from './OutlineText.module.scss'

type CustomOutline = {
  light: {
    backgroundColor: string
    outlineColor: string
  }
  dark: {
    backgroundColor: string
    outlineColor: string
  }
}
export type OutlineTextProps = {
  className?: string
  colorTheme?: 'light' | 'dark'
  text: string
  customColor?: CustomOutline
}

export const OutlineText = ({ className, colorTheme, text, customColor }: OutlineTextProps) => {
  const color = colorTheme ? colorTheme : useTheme().palette.mode

  const customize = customColor
    ? {
        color: customColor[color].backgroundColor,
        '--shadow-color': customColor[color].outlineColor
      }
    : {
        '--shadow-color': color === 'light' ? '#000000' : '#ffffff'
      }

  return (
    <span
      className={`${styles[`outline-${color}`]} ${className ? className : ''}`}
      style={customize}
      data-text={text}>
      {text}
    </span>
  )
}
