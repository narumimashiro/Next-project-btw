import { useEffect, useState, useRef } from 'react'

import { useTheme } from '@mui/material'
import ArrowDownLight from '@/img/light/arrow_down_light.svg'
import ArrowDownDark from '@/img/dark/arrow_down_dark.svg'

import styles from './Accordion.module.scss'

export type AccordionProps = {
  colorTheme?: 'light' | 'dark'
  summary: string
  summaryStyle?: string
  detailTextList?: string[]
  detailComponent?: React.ReactNode
  detailStyle?: string
}

export const Accordion = ({
  colorTheme,
  summary,
  summaryStyle,
  detailTextList,
  detailComponent,
  detailStyle
}: AccordionProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const color = colorTheme ? colorTheme : useTheme().palette.mode

  const [detailsOpen, setDetailsOpen] = useState(false)
  const accordionDetailRef = useRef<HTMLDivElement>(null)
  const [detailHeight, setDetailHeight] = useState(0)

  useEffect(() => {
    if (accordionDetailRef.current) {
      setDetailHeight(detailsOpen ? accordionDetailRef.current.scrollHeight : 0)
    }
  }, [detailsOpen])

  const accordionDetailStyle = {
    maxHeight: `${detailHeight}px`,
    opacity: `${detailsOpen ? 1 : 0}`,
    transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out'
  }

  return (
    <div className={`${styles.BTW_accordionWrap} ${styles[color]}`}>
      <button
        className={`${styles.BTW_summary} ${summaryStyle ? summaryStyle : styles.default}`}
        onClick={() => setDetailsOpen(!detailsOpen)}>
        {summary}
        <img
          className={`${styles.BTW_arrowIcon} ${
            detailsOpen ? styles.BTW_clockwise : styles.BTW_counterclockwise
          }`}
          src={color === 'light' ? ArrowDownLight.src : ArrowDownDark.src}
          alt=""
        />
      </button>
      <div className={styles[`BTW_horizon-${color}`]}></div>
      <div
        ref={accordionDetailRef}
        style={accordionDetailStyle}
        className={`${styles.BTW_details} ${detailStyle ? detailStyle : ''}`}>
        {detailTextList?.map((detail, index) => (
          <p key={`detail-text-${index}`} className={styles.BTW_detailText}>
            {detail}
          </p>
        ))}
        {detailComponent}
      </div>
    </div>
  )
}
