import Link from 'next/link'

import { useTheme } from '@mui/material'

import styles from './TextLink.module.scss'

export type TextLinkProps = {
  colorTheme?: 'light' | 'dark'
  text: string
  href: string
}
export const TextLink = ({ colorTheme, text, href }: TextLinkProps) => {
  const theme = useTheme().palette.mode
  const color = colorTheme ? colorTheme : theme

  const isInternalLink = !/^(https?:|\/\/)/.test(href)

  return isInternalLink ? (
    <Link href={href} className={styles[`BTW_textlink-${color}`]}>
      {text}
    </Link>
  ) : (
    <a
      href={href}
      className={styles[`BTW_textlink-${color}`]}
      target="_blank"
      rel="noopener noreferrer">
      {text}
    </a>
  )
}
