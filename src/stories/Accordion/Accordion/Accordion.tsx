import { useEffect, useState, useRef } from 'react'

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
  colorTheme = 'light',
  summary,
  summaryStyle,
  detailTextList,
  detailComponent,
  detailStyle
}: AccordionProps) => {
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
    <div className={`${styles.accordionWrap} ${styles[colorTheme]}`}>
      <button
        className={`text-xl ${styles.summary} ${summaryStyle}`}
        onClick={() => setDetailsOpen(!detailsOpen)}>
        {summary}
        <img
          className={`${styles.arrowIcon} ${
            detailsOpen ? styles.clockwise : styles.counterclockwise
          }`}
          src={colorTheme === 'light' ? ArrowDownLight.src : ArrowDownDark.src}
          alt=""
        />
      </button>
      <div className={styles[`horizon-${colorTheme}`]}></div>
      <div
        ref={accordionDetailRef}
        style={accordionDetailStyle}
        className={`${styles.details} ${detailStyle}`}>
        {detailTextList?.map((detail, index) => (
          <p key={`detail-text-${index}`} className={styles.detailText}>
            {detail}
          </p>
        ))}
        {detailComponent}
      </div>
    </div>
  )
}
