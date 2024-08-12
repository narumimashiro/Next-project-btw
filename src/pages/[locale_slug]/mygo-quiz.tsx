import { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useState } from 'react'

import { useTheme } from '@mui/material'
import { useRecoilValue } from 'recoil'
import styles from '@/styles/MygoQuiz.module.scss'

import Meta from '@/components/meta'
import { PageTemplateWithHeader } from '@/components/molecules/pageComponents'
import { TabPanel, Tabs } from '@/stories/Tab/Tab'
import { AnnotationText, BodyText, HeadlineText } from '@/components/atom/componentsTemplate'
import { StrongButton } from '@/stories/Button/StrongButton'
import { useCustomContext } from '@/components/customProvider'
import {
  GetMygoMusicInformationApi,
  MygoMusicInformationState,
  MygoMusicInformationType
} from '@/recoil/services/getMygoMusicInformation'
import { useLocaleSlug } from '@/hooks/useLocaleSlug'
import { API_STATUS } from '@/hooks/useApiStatus'
import { TextField } from '@/stories/TextField/TextField'
import { Accordion } from '@/stories/Accordion/Accordion'
import {
  CountdownQuizStart,
  MygoLinksInfo,
  MygoQuizCard,
  MygoQuizCardGallery,
  QuizMygo
} from '@/components/organisms/mygoComponents'
import { GetMygoQuizListApi, MygoQuizListState } from '@/recoil/services/getMygoQuizList'
import { shuffleList } from '@/lib/utils'

export const getStaticPaths: GetStaticPaths = async () => {
  const { language }: { language: string[] } = require('@/locales/config')
  const paths = language.map((locale) => ({
    params: { locale_slug: locale }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { locale_slug } = params!

  return {
    props: {
      locale: locale_slug
    }
  }
}

const QuizTabContents = ({ onClickStartQuiz }: { onClickStartQuiz: () => void }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const colorTheme = theme.palette.mode

  return (
    <>
      <BodyText className="mb-8">{t('STRID_mygo_quiz_description1')}</BodyText>
      <BodyText className="mb-16">{t('STRID_mygo_quiz_description2')}</BodyText>
      <AnnotationText>{t('STRID_mygo_quiz_annotation1')}</AnnotationText>
      <AnnotationText>{t('STRID_mygo_quiz_annotation2')}</AnnotationText>
      <AnnotationText>{t('STRID_mygo_quiz_annotation3')}</AnnotationText>
      <div className={styles.quizuStart}>
        <StrongButton
          className={styles.quizStartBtn}
          colorTheme={colorTheme}
          onClick={onClickStartQuiz}>
          {t('STRID_mygo_quiz_start')}
        </StrongButton>
      </div>
    </>
  )
}

const QuizListContents = () => {
  const { isPortrait, isTabletSize } = useCustomContext()
  const breakPoint = isTabletSize ? 2 : isPortrait ? 1 : 3

  const mygoQuizList = useRecoilValue(MygoQuizListState)
  const viewMygoQuizList = useMemo(
    () => shuffleList(mygoQuizList, mygoQuizList.length),
    [mygoQuizList]
  )

  return (
    <MygoQuizCardGallery breakPoint={breakPoint}>
      {viewMygoQuizList.map((el, index) => (
        <MygoQuizCard key={index} quizText={el.quiz} answer={el.answer} variant={index % 5} />
      ))}
    </MygoQuizCardGallery>
  )
}

const MygoDictionaryContents = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const colorTheme = theme.palette.mode

  const mygoMusicInfo = useRecoilValue(MygoMusicInformationState)
  const viewMygoMusicInfo = useMemo(
    () => [...mygoMusicInfo].sort((a, b) => (a.unique_id < b.unique_id ? -1 : 1)),
    [mygoMusicInfo]
  )
  const [displayInfo, setDisplayInfo] = useState<MygoMusicInformationType[]>(mygoMusicInfo)
  const [userSearchInput, setUserSearchInput] = useState('')
  useEffect(() => {
    setDisplayInfo(() => {
      return viewMygoMusicInfo.filter((info) => {
        const { title, how_to_read, description } = info.music_info
        const isSeachHit =
          title.includes(userSearchInput) ||
          how_to_read.includes(userSearchInput) ||
          description.some((desc) => desc.includes(userSearchInput))
        return isSeachHit
      })
    })
  }, [viewMygoMusicInfo, userSearchInput])

  return (
    <div className={styles.mygoDictContents}>
      <TextField
        className={styles.searchBox}
        colorTheme={colorTheme}
        placeholder={t('STRID_search')}
        onChangeInput={setUserSearchInput}
        clearButton
      />
      <HeadlineText className={styles['mygo-dict']}>{t('STRID_mygo_dict')}</HeadlineText>
      {displayInfo.map((info) => (
        <Accordion
          key={info.unique_id}
          colorTheme={colorTheme}
          summary={t('STRID_mygo_dict_summary')
            .replace('{0}', info.music_info.title)
            .replace('{1}', info.music_info.how_to_read)}
          detailTextList={info.music_info.description}
          detailComponent={
            <MygoLinksInfo
              officialLink={info.official_site_link}
              youtubeLink={info.youtube_link}
            />
          }
        />
      ))}
    </div>
  )
}

const MygoQuiz = () => {
  const { t } = useTranslation()
  const { isPortrait } = useCustomContext()

  const QUIZ_TAB = 0
  const QUIZLIST_TAB = 1
  const MYGO_DICT_TAB = 2
  const [currentTab, setCurrentTab] = useState(QUIZ_TAB)

  const [readyQuiz, setReadyQuiz] = useState(false)
  const [countdown, setCountdown] = useState(false)
  const [startPlayingQuiz, setStartPlayingQuiz] = useState(false)
  useEffect(() => {
    if (readyQuiz) setCountdown(true)
  }, [readyQuiz])
  const startQuiz = () => {
    setCountdown(false)
    setStartPlayingQuiz(true)
  }

  const finishQuiz = () => {
    setStartPlayingQuiz(false)
    setReadyQuiz(false)
  }

  const locale_slug = useLocaleSlug()
  const mygoQuizList = useRecoilValue(MygoQuizListState)
  const shuffleMygoQuiz = useMemo(
    () => shuffleList(mygoQuizList, 10),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mygoQuizList, startPlayingQuiz]
  )
  const { getMygoMusicInformation, mygoMusicInfoFetchState } = GetMygoMusicInformationApi()
  const { getMygoQuizList, mygoQuizListFetchState } = GetMygoQuizListApi()
  useEffect(() => {
    if (API_STATUS.IDLE === mygoMusicInfoFetchState) {
      getMygoMusicInformation({
        lang: locale_slug.split('-')[0],
        country: locale_slug.split('-')[1]
      })
    }
    if (API_STATUS.IDLE === mygoQuizListFetchState) getMygoQuizList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mygoMusicInfoFetchState, locale_slug])

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', t('STRID_meta_mygo_quiz'))} />
      <PageTemplateWithHeader
        className={styles['margin-bottom-24']}
        imgSrc={'/images/mygo.png'}
        title={t('STRID_meta_mygo_quiz')}>
        <>
          {!readyQuiz ? (
            <>
              <Tabs
                className={`${styles.mygoTabs} ${isPortrait ? styles.portrait : ''}`}
                tabList={[
                  { label: t('STRID_mygo_tab_quiz') },
                  { label: t('STRID_mygo_tab_quizlist') },
                  { label: t('STRID_mygo_tab_dictionary') }
                ]}
                value={currentTab}
                onChange={setCurrentTab}
              />
              <TabPanel value={currentTab} tabIndex={QUIZ_TAB}>
                <QuizTabContents onClickStartQuiz={() => setReadyQuiz(true)} />
              </TabPanel>
              <TabPanel value={currentTab} tabIndex={QUIZLIST_TAB}>
                <QuizListContents />
              </TabPanel>
              <TabPanel value={currentTab} tabIndex={MYGO_DICT_TAB}>
                <MygoDictionaryContents />
              </TabPanel>
            </>
          ) : (
            <div className={styles['margion-top-24']}>
              <CountdownQuizStart start={countdown} onClose={startQuiz} />
              <QuizMygo
                quizList={shuffleMygoQuiz}
                start={startPlayingQuiz}
                onFinishQuiz={finishQuiz}
              />
            </div>
          )}
        </>
      </PageTemplateWithHeader>
    </>
  )
}
export default MygoQuiz
