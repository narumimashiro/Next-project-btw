import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import Meta from '@/components/meta'
import { PageTemplateWithHeader } from '@/components/molecules/pageComponents'
import { isMobileDevice } from '@/lib/isMobileDevice'
import { BodyText, HeadlineText } from '@/components/atom/componentsTemplate'
import { StrongButton } from '@/stories/Button/StrongButton'
import { UrlCopyButton } from '@/components/molecules/urlCopyButton'

import styles from '@/styles/WebCamera.module.scss'

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

const WebCamera = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const isMobile = isMobileDevice()

  const handleBootOtakuCamera = () => {
    const currentPath = router.asPath
    router.push(`${currentPath}/otaku-camera`)
  }

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', t('TEMP_オタクカメラ'))} />
      <PageTemplateWithHeader
        imgSrc={'/images/webcamera_header.png'}
        title={t('TEMP_Web Camera')}
        className={styles['page-container']}>
        <div className={styles.description}>
          <HeadlineText className="mb-8">{t('TEMP_推しと一緒に写真を撮ろう。')}</HeadlineText>
          <BodyText>{t('TEMP_あなたの推しがフレーム内に!?')}</BodyText>
          <BodyText>{t('TEMP_カメラフレーム内に推しキャラが遊びに来るよ!!')}</BodyText>
        </div>

        {isMobile ? (
          <>
            <HeadlineText className="mb-8">{t('TEMP_始め方')}</HeadlineText>
            <BodyText>
              {t('TEMP_カメラ起動ボタンを押下するとカメラページに遷移します。')}
            </BodyText>
            <BodyText>
              {t(
                'TEMP_ページ遷移後、カメラアクセス許可を確認するポップが出てきますが、許可をタップすることでカメラページで撮影が可能となります。'
              )}
            </BodyText>
            <BodyText className="mb-24">
              {t(
                'TEMP_画面右上のメニューや撮影ボタン上部からキャラクターの切り替えができます。'
              )}
            </BodyText>
            <StrongButton className={styles.execButton} onClick={handleBootOtakuCamera}>
              {t('TEMP_オタクカメラ起動')}
            </StrongButton>
          </>
        ) : (
          <>
            <BodyText className={styles.annotation}>
              {t('TEMP_*オタクカメラはPCでは利用できません。')}
            </BodyText>
            <BodyText>
              {t('TEMP_スマホやタブレットなどモバイル端末からこのページを開いてください。')}
            </BodyText>
            <BodyText className="mb-24">
              {t('TEMP_URLコピーボタンからこのページのURLをコピーできます。')}
            </BodyText>
            <UrlCopyButton buttonClass={styles.execButton} buttonType="strong" />
          </>
        )}
      </PageTemplateWithHeader>
    </>
  )
}
export default WebCamera
