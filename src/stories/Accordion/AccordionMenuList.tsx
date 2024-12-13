import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useTheme } from '@mui/material'

import PlusIconLight from '@/img/light/plus_icon.svg'
import MinusIconLight from '@/img/light/minus_icon.svg'
import PlusIconDark from '@/img/dark/plus_icon.svg'
import MinusIconDark from '@/img/dark/minus_icon.svg'

import styles from './AccordionMenuList.module.scss'

type MenuListProps = {
  isInternalLink?: boolean
  displayText: string
  link: string
}

export type AccordionMenuListProps = {
  colorTheme?: 'light' | 'dark'
  summary: string
  summaryStyle?: string
  menuList: MenuListProps[]
  listType?: 'right' | 'left'
}

export const AccordionMenuList = ({
  colorTheme,
  summary,
  summaryStyle,
  menuList,
  listType = 'left'
}: AccordionMenuListProps) => {
  const theme = useTheme()
  const color = colorTheme ? colorTheme : theme.palette.mode

  const [openMenuList, setOpenMenuList] = useState(false)
  const openMenuStyle = openMenuList ? 'BTW_open-menu' : ''
  const menuListRef = useRef<HTMLUListElement>(null)
  const [menuListHeight, setMenuListHeight] = useState(0)

  useEffect(() => {
    if (menuListRef.current) {
      setMenuListHeight(openMenuList ? menuListRef.current.scrollHeight : 0)
    }
  }, [openMenuList])

  const menuListStyle = {
    maxHeight: `${menuListHeight}px`,
    opacity: `${openMenuList ? 1 : 0}`,
    transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out'
  }

  return (
    <div className={`${styles.BTW_accordionMenuListWrap} ${styles[color]}`}>
      <div className={styles[`BTW_horizon-${color}`]}></div>
      <button
        className={`text-xl ${styles[`BTW_summary-${listType}`]} ${
          summaryStyle ? summaryStyle : ''
        }`}
        onClick={() => setOpenMenuList(!openMenuList)}>
        {summary}
        <img
          className={`${styles.BTW_plusIcon} ${styles[openMenuStyle]}`}
          src={color === 'light' ? PlusIconLight.src : PlusIconDark.src}
          alt=""
        />
        <img
          className={`${styles.BTW_minusIcon} ${styles[openMenuStyle]}`}
          src={color === 'light' ? MinusIconLight.src : MinusIconDark.src}
          alt=""
        />
      </button>
      <div className={styles[`BTW_horizon-${color}`]}></div>
      <ul
        ref={menuListRef}
        className={`${styles[`BTW_menu-list-wrap-${listType}`]} ${styles[color]}`}
        style={menuListStyle}>
        {menuList.map((el) => (
          <MenuItem
            key={el.displayText}
            isInternalLink={el.isInternalLink}
            displayText={el.displayText}
            link={el.link}
            colorTheme={color}
          />
        ))}
      </ul>
    </div>
  )
}

const MenuItem = (props: MenuListProps & { colorTheme: 'light' | 'dark' }) => {
  const { isInternalLink, displayText, link, colorTheme } = props

  return (
    <li className={`text-base ${styles.BTW_menuItem} ${styles[colorTheme]}`}>
      {isInternalLink ? (
        <Link className={styles.BTW_link} href={link}>
          {displayText}
        </Link>
      ) : (
        <a className={styles.BTW_link} href={link} target="_blank" rel="noreferrer">
          {displayText}
        </a>
      )}
    </li>
  )
}
