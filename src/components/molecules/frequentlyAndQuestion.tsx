import { useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import styles from '@/styles/molecules/FrequentlyAndQuestion.module.scss'

import { Accordion } from '@/stories/Accordion/Accordion'

import { useCustomContext } from '../customProvider'

type FaqType = { summary: string; details: string[] }
type FrequentlyAndQuestionProps = {
  className?: string
  faqList: FaqType[]
}
export const FrequentlyAndQuestion = ({
  className = '',
  faqList
}: FrequentlyAndQuestionProps) => {
  const color = useTheme().palette.mode
  const { t } = useTranslation()
  const { isTabletSize } = useCustomContext()

  return (
    <div
      className={`${styles[`fap-wrapper-${color}`]} ${isTabletSize ? styles.tablet : ''} ${className}`}>
      <p className="text-2xl-bold mb-24">{t('STRID_faq_title')}</p>
      {faqList.map((faq) => (
        <Accordion key={faq.summary} summary={faq.summary} detailTextList={faq.details} />
      ))}
    </div>
  )
}
