import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState } from 'react'
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
import { HeadlineText } from '@/components/atom/componentsTemplate'
import { useCustomContext } from '@/components/customProvider'

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

type QuizResultType = {
  isCorrect: boolean
  additional: boolean
  isHaruhikage: boolean
}
type QuizMygoProps = {
  quizList: MygoQuizListType[]
  start: boolean
  onFinishQuiz: () => void
}
export const QuizMygo = ({ quizList, start, onFinishQuiz }: QuizMygoProps) => {
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
  const [pushAnswerButton, setPushAnswerButton] = useState(false)
  const [userInputText, setUserInputText] = useState('')
  const [userPushPoint, setUserPushPoint] = useState(0)
  const [quizResult, setQuizResult] = useState<QuizResultType[]>(() => {
    return Array(quizList.length).fill({
      isCorrect: false,
      additional: false,
      isHaruhikage: false
    })
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
        return 0
      }
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
              <QuizQuickBuzzerText
                setPushPoint={setUserPushPoint}
                text={quizList[quizCount].quiz}
                pause={pushAnswerButton}
              />
            </div>
            {READING_QUIZ === phase ? (
              <QuickPressButton onClick={handlePushQuickButton} />
            ) : (
              // ANSWER_QUESTION === phase
              <>
                <AnswerBoard userInputText={userInputText} onInputText={setUserInputText} />
                <StrongButton
                  colorTheme={colorTheme}
                  className={styles['answer-submit-button']}
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
            currentCount={quizCount}
            quizList={quizList}
            userPushPoint={userPushPoint}
            setQuizResult={setQuizResult}
          />
        ) : (
          <ResultScreen quizResult={quizResult} onClickToTop={onFinishQuiz} />
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
  currentCount: number
  quizList: MygoQuizListType[]
  userPushPoint: number
  setQuizResult: React.Dispatch<React.SetStateAction<QuizResultType[]>>
}
const JudgeQuizAnswer = ({
  onNextQuiz,
  userInput,
  currentCount,
  quizList,
  userPushPoint,
  setQuizResult
}: JudgeQuizAnswerProps) => {
  const { isPortrait } = useCustomContext()
  const { t } = useTranslation()
  const theme = useTheme()
  const colorTheme = theme.palette.mode

  const isCorrect = useMemo(() => {
    return quizList[currentCount].answer.includes(userInput)
  }, [currentCount, quizList, userInput])

  const isGetAdditionalPoint = useMemo(() => {
    return quizList[currentCount].judge_point.additional_point >= userPushPoint
  }, [currentCount, quizList, userPushPoint])

  const handleNextQuiz = () => {
    setQuizResult((pre) => {
      return pre.map((result, index) => {
        if (index === currentCount) {
          return {
            ...result,
            isCorrect: isCorrect,
            additional: isGetAdditionalPoint,
            isHaruhikage: quizList[currentCount].judge_point.is_haruhikage
          }
        } else {
          return result
        }
      })
    })
    onNextQuiz()
  }

  return (
    <div className={styles['judge-answer']}>
      <p
        className={`font-bold ${styles[`result-disp-${isPortrait ? 'portrait' : 'landscape'}`]}`}>
        {isCorrect ? t('STRID_mygo_correct_answer') : t('STRID_mygo_incorrect_answer')}
      </p>
      <Image width={200} height={200} src={isCorrect ? Correct.src : Incorrect.src} alt="" />
      <StrongButton colorTheme={colorTheme} onClick={handleNextQuiz}>
        {t('STRID_mygo_next_quiz')}
      </StrongButton>
    </div>
  )
}

type ResultScreenProps = {
  quizResult: QuizResultType[]
  onClickToTop: () => void
}
const ResultScreen = ({ quizResult, onClickToTop }: ResultScreenProps) => {
  const { isPortrait, isTabletSize } = useCustomContext()
  const { t } = useTranslation()
  const theme = useTheme()
  const colorTheme = theme.palette.mode
  const orientation = isPortrait ? 'portrait' : isTabletSize ? 'tablet' : 'landscape'

  const TOMORI = 'tomori',
    ANON = 'anon',
    RANA = 'rana',
    SOYO = 'soyo',
    TAKI = 'taki'
  const [mygoMember, setMygoMember] = useState('')

  const incorrectHaruhikage = useMemo(() => {
    return quizResult.some((result) => !result.isCorrect && result.isHaruhikage)
  }, [quizResult])

  const calculationScore = useMemo(() => {
    let score = 0
    for (const result of quizResult) {
      if (result.isCorrect) {
        score += 10
        if (result.additional) score += 5
      }
    }
    return score
  }, [quizResult])

  useEffect(() => {
    if (incorrectHaruhikage) {
      setMygoMember(SOYO)
      return
    }
    const score = calculationScore
    if (80 <= score) {
      setMygoMember(ANON)
    } else if (50 <= score && 80 > score) {
      setMygoMember(RANA)
    } else if (25 <= score && 50 > score) {
      setMygoMember(TOMORI)
    } else {
      setMygoMember(TAKI)
    }
  }, [calculationScore, incorrectHaruhikage])

  const getResultText = (score: number) => {
    if (incorrectHaruhikage) {
      return t('TEMP_なんで春日影の問題間違えたの!?そよさんからのお怒りメッセージ')
    }

    if (80 <= score) {
      return t('TEMP_すごいすごい。愛音ちゃんに褒めてもらえるとにかく褒めてもらえる。')
    } else if (50 <= score && 80 > score) {
      return t('TEMP_そこそこすごい。楽奈が興味なさそうにテキトーなセリフでほめてくれる')
    } else if (25 <= score && 50 > score) {
      return t('TEMP_うーん。。。燈が元気づけようと慰めてくれるようなセリフを表示する')
    } else {
      return t('TEMP_？？？、不甲斐ない結果に立希が罵倒してくる')
    }
  }

  return (
    <div className={styles['result-screen']}>
      <p
        className={`font-bold ${styles[`result-disp-${isPortrait ? 'portrait' : 'landscape'}`]}`}>
        {t('STRID_mygo_quiz_result')}
      </p>
      <div className={`${styles['result-board']} ${styles[colorTheme]}`}>
        <p className={styles.score}>
          {t('STRID_mygo_score').replace('{0}', `${calculationScore}`)}
        </p>
        <p>{getResultText(calculationScore)}</p>
      </div>
      <StrongButton colorTheme={colorTheme} onClick={onClickToTop}>
        {t('STRID_mygo_quiz_to_top')}
      </StrongButton>
      <img
        className={`${styles[`img-${mygoMember}`]} ${styles[orientation]}`}
        src={`/images/mygo_${mygoMember}.png`}
        alt=""
      />
    </div>
  )
}
