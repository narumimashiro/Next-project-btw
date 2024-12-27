import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import MicIcon from '@mui/icons-material/Mic'
import { Card, Switch, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import styles from '@/styles/organisms/AlyaComponents.module.scss'

import { AnnotationText, BodyText } from '@/components/atom/componentsTemplate'
import Loading from '@/components/atom/loading'
import { API_STATUS } from '@/hooks/useApiStatus'
import { textToSpeech } from '@/lib/utils'
import { TranslationDataState } from '@/recoil/services/postGoogleTranslate'

import { TextArea } from '@/stories/TextField/TextArea'

export const UserInputTextArea = ({
  onInputText
}: {
  onInputText: (context: string) => void
}) => {
  const { t } = useTranslation()
  const googleTranslationFetchState = useRecoilValue(TranslationDataState).fetchState

  const [inputContext, setInputContext] = useState('')
  useEffect(() => {
    onInputText(inputContext)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputContext])

  return (
    <div className={styles.textAreaContainer}>
      <TextArea
        className={styles.textArea}
        width={'100%'}
        onSetContext={setInputContext}
        disabled={API_STATUS.LOADING === googleTranslationFetchState}
        placeholder={t('STRID_alya_textarea_placeholder')}
      />
      {API_STATUS.LOADING === googleTranslationFetchState && (
        <div className="absolute-center">
          <Loading />
        </div>
      )}
    </div>
  )
}

export const AlyaTranslationCard = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const colorTheme = theme.palette.mode

  const translateAlya = useRecoilValue(TranslationDataState).response
  const [unsupportSpeach, setUnsupportSpeach] = useState(false)

  const handleSpeachText = () => {
    if (translateAlya) {
      setUnsupportSpeach(!textToSpeech(translateAlya.translated_text, 'ru-ru'))
    }
  }

  return (
    <Card className={styles.translationCard}>
      <img src="/images/alya_icon2.png" alt="" />
      <div className={styles.translationContainer}>
        <BodyText className={styles.textArea}>{translateAlya?.translated_text}</BodyText>
        <div className={styles.readingText}>
          <button
            className={`button-active-${colorTheme} ${styles.micbutton}`}
            onClick={handleSpeachText}>
            <MicIcon />
          </button>
          {unsupportSpeach ? (
            <AnnotationText className={styles.unsupport}>
              {t('STRID_cmn_unsupport')}
            </AnnotationText>
          ) : null}
        </div>
      </div>
    </Card>
  )
}

type AlyaWordListCardProps = {
  iconLeft: boolean
  wordNativeLang: string
  wordForeignLang: string
}
export const AlyaWordListCard = ({
  iconLeft,
  wordNativeLang,
  wordForeignLang
}: AlyaWordListCardProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const colorTheme = theme.palette.mode

  const [selectForeign, setSelectForeign] = useState(true)
  const [unsupportSpeach, setUnsupportSpeach] = useState(false)

  const handleSpeachText = () => {
    setUnsupportSpeach(!textToSpeech(wordForeignLang, 'ru-ru'))
  }

  return (
    <Card className={`${styles.translationCard} mb-16`}>
      {iconLeft ? <img src="/images/alya_icon2.png" alt="" /> : null}
      <div className={styles.translationContainer}>
        <BodyText className={styles.textArea}>
          {selectForeign ? wordForeignLang : wordNativeLang}
        </BodyText>
        <div className={styles.underContents}>
          <div className={styles.readingText}>
            {selectForeign ? (
              <button
                className={`button-active-${colorTheme} ${styles.micbutton}`}
                onClick={handleSpeachText}>
                <MicIcon />
              </button>
            ) : null}
            {unsupportSpeach ? (
              <AnnotationText className={styles.unsupport}>
                {t('STRID_cmn_unsupport')}
              </AnnotationText>
            ) : null}
          </div>
          <div className="flex-center">
            <Switch
              defaultChecked={selectForeign}
              size="small"
              onChange={() => setSelectForeign(!selectForeign)}
            />
            <BodyText>{t('STRID_alya_change_language')}</BodyText>
          </div>
        </div>
      </div>
      {!iconLeft && <img src="/images/alya_icon2.png" alt="" />}
    </Card>
  )
}
