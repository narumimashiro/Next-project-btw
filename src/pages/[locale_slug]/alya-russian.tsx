import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useTranslation } from 'next-i18next'

import React from 'react'
import styles from '@/styles/AlyaRussian.module.scss'

import { BodyText } from '@/components/atom/componentsTemplate'
import { useCustomContext } from '@/components/customProvider'
import Meta from '@/components/meta'
import { PageTemplateWithHeader } from '@/components/molecules/pageComponents'
import { TabPanel, Tabs } from '@/stories/Tab/Tab'
import {
  PostGoogleTranslateApi,
  TranslationDataState
} from '@/recoil/services/postGoogleTranslate'
import { AlyaWordListState, GetAlyaWordListApi } from '@/recoil/services/getAlyaWordList'
import {
  PostWordRegistrationApi,
  RegistrationDataState
} from '@/recoil/services/postWordRegistration'
import { StrongButton } from '@/stories/Button/StrongButton'
import { BasicButton } from '@/stories/Button/BasicButton'
import {
  AlyaTranslationCard,
  AlyaWordListCard,
  UserInputTextArea
} from '@/components/organisms/alyaComponents'
import { API_STATUS } from '@/hooks/useApiStatus'
import Loading from '@/components/atom/loading'
import { Toast } from '@/stories/Toast/Toast'

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
const TeachMeAlya = () => {
  const { t } = useTranslation()

  const [textAreaContext, setTextAreaContext] = useState('')

  const { postGoogleTranslation } = PostGoogleTranslateApi()
  const translateAlya = useRecoilValue(TranslationDataState).response
  const { postWordRegistration, resetWordRegistrationFetchState } = PostWordRegistrationApi()
  const wordRegistrationFetchState = useRecoilValue(RegistrationDataState).fetchState

  const [toastMessage, setToastMessage] = useState('TEMP_登録できませんでした。')
  useEffect(() => {
    if (API_STATUS.SUCCESS === wordRegistrationFetchState) {
      setToastMessage(t('STRID_alya_toast_complete_registration'))
    }
    if (API_STATUS.FAILED === wordRegistrationFetchState) {
      setToastMessage(t('STRID_alya_toast_error_registration'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordRegistrationFetchState])

  const onClickTranslate = () => {
    postGoogleTranslation({
      text: textAreaContext,
      language: 'ru'
    })
  }

  const handleRegisterWord = () => {
    if (translateAlya) {
      postWordRegistration({
        base_text: translateAlya.original_text,
        translate_text: translateAlya.translated_text
      })
    }
  }

  return (
    <>
      <div className={styles['teach-me-alya']}>
        <BodyText>{t('STRID_alya_acq_write_word')}</BodyText>
        <UserInputTextArea onInputText={setTextAreaContext} />
        <StrongButton onClick={onClickTranslate} className={styles.execButton}>
          {t('STRID_alya_teach_me_alya')}
        </StrongButton>
      </div>
      <div className={styles['teach-me-alya']}>
        <AlyaTranslationCard />
        <BasicButton
          onClick={handleRegisterWord}
          className={styles.execButton}
          disabled={
            !Boolean(translateAlya.translated_text) ||
            API_STATUS.LOADING === wordRegistrationFetchState
          }>
          {t('STRID_alya_register_word_list')}
        </BasicButton>
        <BodyText>{t('STRID_alya_confirmation_in_wordlist')}</BodyText>
      </div>
      <Toast
        message={toastMessage}
        open={
          API_STATUS.SUCCESS === wordRegistrationFetchState ||
          API_STATUS.FAILED === wordRegistrationFetchState
        }
        onClose={resetWordRegistrationFetchState}
      />
    </>
  )
}

const AlyaWordList = () => {
  const ICON_LEFT = 0
  const alyaWordList = useRecoilValue(AlyaWordListState).response

  return (
    <>
      {alyaWordList.map((el, index) => {
        return (
          <AlyaWordListCard
            key={el.registration_date}
            iconLeft={ICON_LEFT === index % 2}
            wordNativeLang={el.word_native_lang}
            wordForeignLang={el.word_foreign_lang}
          />
        )
      })}
    </>
  )
}

const AlyaRussian = () => {
  const { t } = useTranslation()
  const { isPortrait } = useCustomContext()

  const TAB_TEACH_ME_ALYA = 0
  const TAB_WORD_LIST = 1
  const [currentTab, setCurrentTab] = useState(TAB_TEACH_ME_ALYA)

  const { getAlyaWordListApi } = GetAlyaWordListApi()
  const alyaWordListFetchState = useRecoilValue(AlyaWordListState).fetchState
  useEffect(() => {
    if (API_STATUS.IDLE === alyaWordListFetchState) {
      getAlyaWordListApi()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alyaWordListFetchState])

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', t('STRID_meta_alya'))} />
      <PageTemplateWithHeader
        className="mb-24"
        imgSrc={'/images/alya_russian.png'}
        title={t('STRID_meta_alya')}>
        <>
          <Tabs
            className={`${styles.alyaTabs} ${isPortrait ? styles.portrait : ''}`}
            tabList={[
              { label: t('STRID_alya_tab_translation_alya') },
              { label: t('STRID_alya_tab_wordlist') }
            ]}
            value={currentTab}
            onChange={setCurrentTab}
          />
          <TabPanel value={currentTab} tabIndex={TAB_TEACH_ME_ALYA}>
            <TeachMeAlya />
          </TabPanel>
          <TabPanel value={currentTab} tabIndex={TAB_WORD_LIST}>
            {API_STATUS.SUCCESS === alyaWordListFetchState ? (
              <AlyaWordList />
            ) : API_STATUS.FAILED === alyaWordListFetchState ? (
              <></>
            ) : (
              <div className={styles.loading}>
                <Loading />
              </div>
            )}
          </TabPanel>
        </>
      </PageTemplateWithHeader>
    </>
  )
}
export default AlyaRussian
