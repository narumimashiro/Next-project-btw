import { useTheme } from '@mui/material'

import { useCustomContext } from '@/components/customProvider'

import styles from '@/styles/atom/ComponentsTemplate.module.scss'

type TextProps = {
  children: React.ReactNode
  className?: string
}

export const HeadlineText = ({ children, className = '' }: TextProps) => {
  const { isPortrait } = useCustomContext()

  return (
    <p className={`${isPortrait ? 'text-base-bold' : 'text-xl-bold'} ${className}`}>
      {children}
    </p>
  )
}

export const SubTitleText = ({ children, className = '' }: TextProps) => {
  return <BodyText className={`${className} font-bold`}>{children}</BodyText>
}

export const BodyText = ({ children, className = '' }: TextProps) => {
  const { isPortrait } = useCustomContext()

  return <p className={`${isPortrait ? 'text-sm' : 'text-base'} ${className}`}>{children}</p>
}

export const AnnotationText = ({ children, className = '' }: TextProps) => {
  const theme = useTheme()
  const colorTheme = theme.palette.mode

  return (
    <p className={`text-xs ${styles[`annotation-${colorTheme}`]} ${className}`}>{children}</p>
  )
}

export const WebHorizon = ({ className = '' }: { className?: string }) => {
  const theme = useTheme()
  const colorTheme = theme.palette.mode

  return <hr className={`web-horizon-${colorTheme} ${className}`} />
}
