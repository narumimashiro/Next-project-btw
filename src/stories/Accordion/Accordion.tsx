import { useState } from 'react'

import ArrowDownLight from '@/img/light/arrow_down_light.svg'
import ArrowDownDark from '@/img/dark/arrow_down_dark.svg'

import styles from './Accordion.module.scss'

export type AccordionProps = {
  colorTheme?: 'light' | 'dark'
  summary: string
  summaryStyle?: string,
  detailTextList?: string[],
  detailComponent?: React.ReactNode,
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

  return (
    <div className={`${styles.accordionWrap} ${styles[colorTheme]}`}>
      <button
        className={`text-xl ${styles.summary} ${summaryStyle}`}
        onClick={() => setDetailsOpen(!detailsOpen)}
      >
        { summary }
        <img
          className={`${styles.arrowIcon} ${detailsOpen ? styles.clockwise : styles.counterclockwise}`}
          src={colorTheme === 'light' ? ArrowDownLight.src : ArrowDownDark.src}
          alt=''
        />
      </button>
      <div className={styles[`horizon-${colorTheme}`]}></div>
      <div className={`${styles.details} ${detailsOpen ? styles.open : ''} ${detailStyle}`}>
        {
          detailTextList?.map((detail, index) => (
            <p key={`detail-text-${index}`} className={styles.detailText}>
              { detail }
            </p>
          ))
        }
        { detailComponent }
      </div>
    </div>
  )
}