import { Grid, useTheme } from '@mui/material'

import styles from './Tab.module.scss'

const UNDERLINE = 'underline'
const STICKY_NOTE = 'sticky_note'
export type TabVariant = typeof UNDERLINE | typeof STICKY_NOTE

export type TabsProps = {
  className?: string
  tabList: {
    label: string
    icon?: React.ReactNode
  }[]
  value: number
  onChange: (value: number) => void
  variant?: TabVariant
}

export const Tabs = ({
  className = '',
  tabList,
  value,
  onChange,
  variant = 'underline'
}: TabsProps) => {
  const colorTheme = useTheme().palette.mode
  const tabLength = tabList.length

  return (
    <div className={`${styles.BTW_tabs} ${className}`}>
      <Grid container>
        {tabList.map((tab, index) => (
          <Grid item key={tab.label} xs={12 / tabLength}>
            {variant === STICKY_NOTE ? (
              <StickyNoteTabItem
                isFirstEl={0 === index}
                isLastEl={index === tabLength - 1}
                colorTheme={colorTheme}
                label={tab.label}
                icon={tab.icon}
                selected={index === value}
                onClick={() => onChange(index)}
                id={`tab-${index}`}
                aria-controls={`tabpanel-${index}`}
              />
            ) : (
              <UnderlineTabItem
                colorTheme={colorTheme}
                label={tab.label}
                icon={tab.icon}
                selected={index === value}
                onClick={() => onChange(index)}
                id={`tab-${index}`}
                aria-controls={`tabpanel-${index}`}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

type TabItemProps = {
  colorTheme: 'light' | 'dark'
  label: string
  icon?: React.ReactNode
  selected: boolean
  onClick: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const UnderlineTabItem = ({
  colorTheme,
  label,
  icon,
  selected,
  onClick,
  ...buttonProps
}: TabItemProps) => {
  return (
    <button
      className={`button-${colorTheme} ${styles[`BTW_underline-${colorTheme}`]} ${selected ? '' : styles['BTW_not-selected']} `}
      onClick={onClick}
      id={buttonProps.id}
      aria-controls={buttonProps['aria-controls']}>
      {icon}
      <span>{label}</span>
    </button>
  )
}

type StickyNoteTabItemProps = {
  isFirstEl: boolean
  isLastEl: boolean
} & TabItemProps

const StickyNoteTabItem = ({
  isFirstEl,
  isLastEl,
  colorTheme,
  label,
  icon,
  selected,
  onClick,
  ...buttonProps
}: StickyNoteTabItemProps) => {
  const specStyle = isFirstEl ? 'BTW_first-sticky' : isLastEl ? 'BTW_last-sticky' : ''

  return (
    <button
      className={`button-${colorTheme} ${styles[`BTW_stickynote-${colorTheme}`]} ${styles[specStyle]} ${selected ? styles.BTW_selected : styles['BTW_not-selected']}`}
      onClick={onClick}
      id={buttonProps.id}
      aria-controls={buttonProps['aria-controls']}>
      {icon}
      <span>{label}</span>
    </button>
  )
}

export type TabPanelProps = {
  children: React.ReactNode
  tabIndex: number
  value: number
}

export const TabPanel = ({ children, tabIndex, value }: TabPanelProps) => {
  const isVisible = value === tabIndex
  const display = isVisible ? 'BTW_tabpanel-visible' : 'BTW_tabpanel-hidden'

  return (
    <div
      role="tabpanel"
      hidden={!isVisible}
      className={`${styles[display]}`}
      id={`tabpanel-${tabIndex}`}
      aria-labelledby={`tab-${tabIndex}`}>
      {children}
    </div>
  )
}
