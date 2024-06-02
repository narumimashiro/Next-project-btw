import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

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
  colorTheme = 'light',
  summary,
  summaryStyle,
  menuList,
  listType = 'left',
}: AccordionMenuListProps) => {

  const [openMenuList, setOpenMenuList] = useState(false)
  const openMenuStyle = openMenuList ? 'open-menu' : 'close-menu'
  const menuListRef = useRef<HTMLUListElement>(null)
  const [menuListHeight, setMenuListHeight] = useState(0)

  useEffect(() => {
    if(menuListRef.current) {
      setMenuListHeight(openMenuList ? menuListRef.current.scrollHeight : 0)
    }
  }, [openMenuList])

  const menuListStyle = {
    maxHeight: `${menuListHeight}px`,
    opacity: `${openMenuList ? 1 : 0}`,
    transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out',
  }

  return (
    <div className={`${styles.accordionMenuListWrap} ${styles[colorTheme]}`}>
      <div className={styles[`horizon-${colorTheme}`]}></div>
      <button
        className={`text-xl ${styles[`summary-${listType}`]} ${summaryStyle}`}
        onClick={() => setOpenMenuList(!openMenuList)}
      >
        { summary }
        <img
          className={`${styles.plusIcon} ${styles[openMenuStyle]}`}
          src={colorTheme === 'light' ? PlusIconLight.src : PlusIconDark.src}
          alt=''
        />
        <img
          className={`${styles.minusIcon} ${styles[openMenuStyle]}`}
          src={colorTheme === 'light' ? MinusIconLight.src : MinusIconDark.src}
          alt=''
        />
      </button>
      <div className={styles[`horizon-${colorTheme}`]}></div>
      <ul
        ref={menuListRef}
        className={`${styles[`menu-list-wrap-${listType}`]} ${styles[colorTheme]}`}
        style={menuListStyle}
      >
        {
          menuList.map(el => (
            <MenuItem
              key={el.displayText}
              isInternalLink={el.isInternalLink}
              displayText={el.displayText}
              link={el.link}
              colorTheme={colorTheme}
            />
          ))
        }
      </ul>
    </div>
  )
}

const MenuItem = (props: MenuListProps & { colorTheme: 'light' | 'dark'}) => {

  const { isInternalLink, displayText, link, colorTheme } = props

  return (
    <li className={`text-base ${styles.menuItem} ${styles[colorTheme]}`}>
      {isInternalLink ? (
        <Link 
          className={styles.link}
          href={link}
        >
          { displayText }
        </Link>
      ) : (
        <a
          className={styles.link}
          href={link} target='_blank' rel='noreferrer'
        >
          { displayText }
        </a>
      )}
    </li>
  )
}