import { Inter } from 'next/font/google'
import styles from '@/styles/Layout.module.scss'
import { useCustomContext } from './customProvider'

const inter = Inter({ subsets: ['latin'] })

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={inter.className}>{children}</div>
}

export const AdoLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles['ado-layout']}>{children}</div>
}
