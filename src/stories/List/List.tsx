import { useTheme } from '@mui/material'
import styles from './List.module.scss'

export type ListProps = {
  colorTheme?: 'light' | 'dark'
  className?: string
  groupName?: string
  children: React.ReactNode
}

export const List = ({
  colorTheme = 'light',
  className = '',
  groupName,
  children
}: ListProps) => {
  const theme = useTheme().palette.mode
  const color = colorTheme ? colorTheme : theme

  return (
    <div className={`${styles[`BTW_list-${color}`]} ${className}`}>
      {groupName && <span className={styles.BTW_groupName}>{groupName}</span>}
      {children}
    </div>
  )
}
