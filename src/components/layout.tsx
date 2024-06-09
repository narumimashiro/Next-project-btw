import { Inter } from 'next/font/google'

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
  const fontStyle = {
    fontFamily: 'Noto Serif JP, Hiragino Mincho ProN, Yu Mincho, serif',
    '--font-en': 'minion-pro, serif',
    '--font-en2': 'interstate-condensed, sans-serif'
  }

  return (
    <div style={fontStyle}>{ children }</div>
  )
}