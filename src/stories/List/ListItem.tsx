import { useRef } from 'react'

import { useTheme } from '@mui/material'

import { BodyText } from '@/components/atom/componentsTemplate'
import { fireOnEnterKey } from '@/lib/utils'

import styles from './ListItem.module.scss'

export type ListItemProps = {
  colorTheme?: 'light' | 'dark'
  children?: React.ReactNode
  text?: string
  icon?: React.ReactNode
  onClick: () => void
}

export const ListItem = ({ colorTheme, children, text, icon, onClick }: ListItemProps) => {
  const theme = useTheme().palette.mode
  const color = colorTheme ? colorTheme : theme
  const listItemButtonRef = useRef<HTMLDivElement | null>(null)

  const createRipple = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const listItemButton = listItemButtonRef.current

    const rect = listItemButton?.getBoundingClientRect() as DOMRect

    const size = Math.max(
      listItemButton?.clientWidth as number,
      listItemButton?.clientHeight as number
    )

    const clientX = 'clientX' in event ? event.clientX : event.touches[0]?.clientX
    const clientY = 'clientY' in event ? event.clientY : event.touches[0]?.clientY
    const x = clientX - rect.left - size / 2
    const y = clientY - rect.top - size / 2

    const ripple = document.createElement('span')
    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.className = styles.ripple

    const existingRipple = listItemButton?.getElementsByClassName('ripple')[0]
    if (existingRipple) {
      existingRipple.remove()
    }

    listItemButton?.appendChild(ripple)

    ripple.addEventListener('animationend', () => {
      ripple.remove()
    })
  }

  return (
    <div
      ref={listItemButtonRef}
      className={styles[`BTW_list-item-${color}`]}
      onClick={onClick}
      onMouseDown={createRipple}
      onTouchStart={createRipple}
      tabIndex={0}
      onKeyDown={fireOnEnterKey(onClick)}
      role="button">
      {icon && <div className={styles.BTW_listIcon}>{icon}</div>}
      {text && <BodyText>{text}</BodyText>}
      {children}
    </div>
  )
}
