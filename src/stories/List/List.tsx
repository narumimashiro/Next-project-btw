import { useTheme } from '@mui/material'

import { SubTitleText } from '@/components/atom/componentsTemplate'

import styles from './List.module.scss'

export type ListProps = {
  colorTheme?: 'light' | 'dark'
  className?: string
  groupName?: string
  children: React.ReactNode
}

export const List = ({ colorTheme, className = '', groupName, children }: ListProps) => {
  const theme = useTheme().palette.mode
  const color = colorTheme ? colorTheme : theme

  return (
    <div className={`${styles[`BTW_list-${color}`]} ${className}`}>
      {groupName ? (
        <SubTitleText className={styles.BTW_groupName}>{groupName}</SubTitleText>
      ) : null}
      {children}
    </div>
  )
}
