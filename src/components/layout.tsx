import { Inter } from 'next/font/google'
import styles from '@/styles/Layout.module.scss'

const inter = Inter({ subsets: ['latin'] })

export const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className={inter.className}>{children}</div>
  )
}

export const AdoLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className={styles['ado-layout']}>{ children }</div>
  )
}