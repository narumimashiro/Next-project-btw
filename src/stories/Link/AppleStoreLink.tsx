import applestoreImg from '@/img/applestore.png'

import styles from './AppleStoreLink.module.scss'

export type AppleStoreLinkProps = {
  link: string
  size?: 'small' | 'normal' | 'large'
}

export const AppleStoreLink = ({ link, size = 'small' }: AppleStoreLinkProps) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className={styles[`BTW_applestore-${size}`]}>
      <img src={applestoreImg.src} alt="App Store" />
    </a>
  )
}
