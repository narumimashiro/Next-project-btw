import React, { useEffect, useRef, useState } from 'react'
import { Card, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import styles from '@/styles/organisms/MygoComponents.module.scss'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { MygoQuizListType } from '@/recoil/services/getMygoQuizList'
import { QuizQuickBuzzerText } from '@/stories/Text/QuizQuickBuzzerText'
import { StrongButton } from '@/stories/Button/StrongButton'
import { HeadlineText } from '../atom/componentsTemplate'
import { useCustomContext } from '../customProvider'

export const MygoLinksInfo = ({
  officialLink,
  youtubeLink
}: {
  officialLink: string
  youtubeLink: string
}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const colorTheme = theme.palette.mode

  return (
    <div>
      <a
        href={officialLink}
        className={`link-${colorTheme}`}
        target="_blank"
        rel="noopener noreferrer">
        {t('STRID_mygo_dict_officiallink')}
      </a>
      <span className={styles.slash}>&#x002F;</span>
      <a
        href={youtubeLink}
        className={`link-${colorTheme}`}
        target="_blank"
        rel="noopener noreferrer">
        {t('STRID_mygo_dict_youtubelink')}
      </a>
    </div>
  )
}

type MygoQuizCardProps = {
  quizText: string
  answer: string[]
  variant: number
}
export const MygoQuizCard = ({ quizText, answer, variant }: MygoQuizCardProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const colorTheme = theme.palette.mode
  const mygoCardRef = useRef(null)
  const isVisible = useIntersectionObserver(mygoCardRef)
  const [cardVisible, setCardVisible] = useState(false)
  useEffect(() => {
    if (isVisible) setCardVisible(true)
  }, [isVisible])

  const [display, setDisplay] = useState(false)

  return (
    <Card
      className={`${styles['mygo-quiz-card']} ${cardVisible ? styles.visible : ''}`}
      ref={mygoCardRef}>
      <div className={styles['quiz-area']}>
        <HeadlineText className={styles[`quiz-healine-${colorTheme}`]}>
          {quizText.slice(0, 5)}
        </HeadlineText>
        <span>{quizText}</span>
      </div>
      <div className={styles['answer-box']}>
        <p className={`${styles[`answer-${variant}`]} font-bold`}>{answer[0]}</p>
        <button
          className={`${styles[`answer-button-${variant}`]} ${display ? styles.visible : ''}`}
          onClick={() => setDisplay(true)}>
          {t('STRID_mygo_view_answer')}
        </button>
      </div>
    </Card>
  )
}

type MygoQuizCardGalleryProps = {
  children: React.ReactNode
  breakPoint: number
}

export const MygoQuizCardGallery = ({ children, breakPoint }: MygoQuizCardGalleryProps) => {
  return <div className={styles[`gallery-${breakPoint}`]}>{children}</div>
}

type CountdownQuizStartProps = {
  start: boolean
  onClose: () => void
}
export const CountdownQuizStart = ({ start, onClose }: CountdownQuizStartProps) => {
  const { t } = useTranslation()

  const [countdown, setCountdown] = useState(3)
  const [countdownFinished, setCountdownFinished] = useState(false)

  useEffect(() => {
    if (!start) return

    const countdownInterval = setInterval(() => {
      setCountdown((pre) => {
        if (pre <= 0) {
          clearInterval(countdownInterval)
          setCountdownFinished(true)
          return 0
        } else {
          return pre - 1
        }
      })
    }, 1 * 1000)

    return () => clearInterval(countdownInterval)
  }, [onClose, start])

  useEffect(() => {
    if (countdownFinished) onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdownFinished])

  return (
    start && (
      <div className={styles.countdown}>
        <p className="font-bold">{t('STRID_mygo_quiz_announce_start')}</p>
        <div className={styles.countdownView}>
          <p className={styles.scaleUp}>{countdown}</p>
        </div>
      </div>
    )
  )
}

type QuizRersultType = {
  isCorrect: boolean
  additional: boolean
}
type QuizMygoProps = {
  quizList: MygoQuizListType[]
  start: boolean
}
export const QuizMygo = ({ quizList, start }: QuizMygoProps) => {
  const { isPortrait } = useCustomContext()
  const { t } = useTranslation()

  const [quizCount, setQuizCount] = useState(0)
  const [quizText, setQuizText] = useState(quizList[0].quiz)
  const [pushAnswerButton, setPushAnswerButton] = useState(false)
  const [quizResult, setQuizResult] = useState<QuizRersultType[]>(() => {
    return Array(quizList.length).fill({ isCorrect: false, additional: false })
  })

  const handleCheckAnswer = () => {
    setQuizCount((pre) => {
      setQuizText(quizList[pre + 1].quiz)
      return pre + 1
    })
    setTimeout(() => {
      setPushAnswerButton(false)
    }, 1000 * 0.1)
  }

  return (
    start && (
      <div className={styles['quiz-area']}>
        <p className={styles[`quiz-count-${isPortrait ? 'portrait' : 'landscape'}`]}>
          {t('STRID_mygo_quiz_question').replace('{0}', `${quizCount + 1}`)}
        </p>
        <div className={styles['view-question']}>
          <QuizQuickBuzzerText text={quizText} pause={pushAnswerButton} />
        </div>
        <button
          className={styles['quick-press-btn']}
          onClick={() => setPushAnswerButton(true)}
          aria-labelledby={t('STRID_mygo_push_answer_button')}>
          <img src="/images/quickpress.png" alt="" />
        </button>
        {pushAnswerButton && <StrongButton onClick={handleCheckAnswer}>解答する</StrongButton>}
      </div>
    )
  )
}
