import googleplayImg from '@/img/googleplay.png'

import styles from './GooglePlayLink.module.scss'

export type GooglePlayLinkProps = {
  link: string
  size?: 'small' | 'normal' | 'large'
}

export const GooglePlayLink = ({ link, size = 'small' }: GooglePlayLinkProps) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className={styles[`BTW_googleplay-${size}`]}>
      <img src={googleplayImg.src} alt="App Store" />
    </a>
  )
}
