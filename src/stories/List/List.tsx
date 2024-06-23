import { useTheme } from '@mui/material'
import styles from './List.module.scss'

export type ListProps = {
  colorTheme?: 'light' | 'dark'
  className?: string
  groupName?: string
  children: React.ReactNode
}

export const List = ({ colorTheme, className, groupName, children }: ListProps) => {
  const color = colorTheme ? colorTheme : useTheme().palette.mode
  return (
    <div className={`${styles[`list-${color}`]} ${className ? className : ''}`}>
      {groupName && <span className={styles.groupName}>{groupName}</span>}
      {children}
    </div>
  )
}
