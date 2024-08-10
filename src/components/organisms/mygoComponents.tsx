import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Card, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import styles from '@/styles/organisms/MygoComponents.module.scss'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { MygoQuizListType } from '@/recoil/services/getMygoQuizList'
import { QuizQuickBuzzerText } from '@/stories/Text/QuizQuickBuzzerText'
import { StrongButton } from '@/stories/Button/StrongButton'
import { TextField } from '@/stories/TextField/TextField'
import Correct from '@/img/correct.svg'
import Incorrect from '@/img/incorrect.svg'
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
      <div className={styles['quiz-area-body']}>
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
  const theme = useTheme()
  const colorTheme = theme.palette.mode

  const READING_QUIZ = 'reading_quiz'
  const ANSWER_QUESTION = 'answer_quiestion'
  const JUDGE_CORRECT = 'correct_answer_judge'
  const RESULT_ANNOUNCE = 'user_result_announce'
  const [phase, setPhase] = useState(READING_QUIZ)
  const [quizCount, setQuizCount] = useState(0)
  const [quizText, setQuizText] = useState(quizList[0].quiz)
  const [pushAnswerButton, setPushAnswerButton] = useState(false)
  const [userInputText, setUserInputText] = useState('')
  const [quizResult, setQuizResult] = useState<QuizRersultType[]>(() => {
    return Array(quizList.length).fill({ isCorrect: false, additional: false })
  })

  const handlePushQuickButton = () => {
    setPushAnswerButton(true)
    setPhase(ANSWER_QUESTION)
  }

  const handleCheckAnswer = () => {
    setPhase(JUDGE_CORRECT)
  }

  const handleNextQuiz = () => {
    setQuizCount((pre) => {
      if (quizList.length - 1 === pre) {
        setPhase(RESULT_ANNOUNCE)
        return pre
      }
      setQuizText(quizList[pre + 1].quiz)
      return pre + 1
    })
    setUserInputText('')
    setPushAnswerButton(false)
    setPhase(READING_QUIZ)
  }

  return (
    start && (
      <div className={styles['quiz-area']}>
        {READING_QUIZ === phase || ANSWER_QUESTION === phase ? (
          <>
            <p
              className={`font-bold ${styles[`quiz-count-${isPortrait ? 'portrait' : 'landscape'}`]}`}>
              {t('STRID_mygo_quiz_question').replace('{0}', `${quizCount + 1}`)}
            </p>
            <div className={styles['view-question']}>
              <QuizQuickBuzzerText text={quizText} pause={pushAnswerButton} />
            </div>
            {READING_QUIZ === phase ? (
              <QuickPressButton onClick={handlePushQuickButton} />
            ) : (
              // ANSWER_QUESTION === phase
              <>
                <AnswerBoard userInputText={userInputText} onInputText={setUserInputText} />
                <StrongButton
                  colorTheme={colorTheme}
                  className={styles['answer-button']}
                  onClick={handleCheckAnswer}>
                  {t('STRID_mygo_answer_the_question')}
                </StrongButton>
              </>
            )}
          </>
        ) : JUDGE_CORRECT === phase ? (
          <JudgeQuizAnswer
            onNextQuiz={handleNextQuiz}
            userInput={userInputText}
            answerList={quizList[quizCount].answer}
          />
        ) : (
          <>結果画面。To be continue...</>
        )}
      </div>
    )
  )
}

const QuickPressButton = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation()
  return (
    <button
      className={styles['quick-press-btn']}
      onClick={onClick}
      aria-labelledby={t('STRID_mygo_push_answer_button')}>
      <Image src="/images/quickpress.png" alt="" width={120} height={100} />
    </button>
  )
}

type AnswerBoardProps = {
  userInputText: string
  onInputText: (input: string) => void
}
const AnswerBoard = ({ userInputText, onInputText }: AnswerBoardProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const colorTheme = theme.palette.mode

  return (
    <div className={styles['answer-board']}>
      <div className={styles['input-viewer']}>
        <span className={styles[colorTheme]}>{userInputText}</span>
      </div>
      <TextField
        placeholder={t('STRID_mygo_input_answer_placeholder')}
        aria-labelledby={t('STRID_mygo_input_answer_placeholder')}
        onChangeInput={onInputText}
        clearButton
      />
    </div>
  )
}

type JudgeQuizAnswerProps = {
  onNextQuiz: () => void
  userInput: string
  answerList: string[]
}
const JudgeQuizAnswer = ({ onNextQuiz, userInput, answerList }: JudgeQuizAnswerProps) => {
  const { isPortrait } = useCustomContext()
  const { t } = useTranslation()
  const theme = useTheme()
  const colorTheme = theme.palette.mode

  const isCorrect = answerList.includes(userInput)

  return (
    <div className={styles['judge-answer']}>
      <p
        className={`font-bold ${styles[`result-disp-${isPortrait ? 'portrait' : 'landscape'}`]}`}>
        {isCorrect ? t('STRID_mygo_correct_answer') : t('STRID_mygo_incorrect_answer')}
      </p>
      <Image width={200} height={200} src={isCorrect ? Correct.src : Incorrect.src} alt="" />
      <StrongButton colorTheme={colorTheme} onClick={onNextQuiz}>
        {t('STRID_mygo_next_quiz')}
      </StrongButton>
    </div>
  )
}
