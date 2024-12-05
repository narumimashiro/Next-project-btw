import { useRecoilValue } from 'recoil'
import { Inter } from 'next/font/google'

import { UserMenu } from '@/components/molecules/menu'
import { isVisibleMenuState } from '@/recoil/manageMenu'

import styles from '@/styles/Layout.module.scss'

const inter = Inter({ subsets: ['latin'] })

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={inter.className}>{children}</div>
}

export const AdoLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles['ado-layout']}>{children}</div>
}

export const LayoutWithMenu = ({ children }: { children: React.ReactNode }) => {
  const isMenuVisible = useRecoilValue(isVisibleMenuState)

  return (
    <AdoLayout>
      {isMenuVisible && <UserMenu />}
      {children}
    </AdoLayout>
  )
}
