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
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', t('STRID_meta_webcamera'))} />
      <PageTemplateWithHeader
        imgSrc={'/images/webcamera_header.png'}
        title={t('STRID_meta_webcamera')}
        className={styles['page-container']}>
        <div className={styles.description}>
          <HeadlineText className="mb-8">{t('STRID_webcamera_take_picture')}</HeadlineText>
          <BodyText>{t('STRID_webcamera_description1')}</BodyText>
          <BodyText>{t('STRID_webcamera_description2')}</BodyText>
        </div>

        {isMobile ? (
          <>
            <HeadlineText className="mb-8">{t('STRID_webcamera_how_to_start')}</HeadlineText>
            <BodyText>{t('STRID_webcamera_use_description1')}</BodyText>
            <BodyText>{t('STRID_webcamera_use_description2')}</BodyText>
            <BodyText className="mb-24">{t('STRID_webcamera_use_description3')}</BodyText>
            <StrongButton className={styles.execButton} onClick={handleBootOtakuCamera}>
              {t('STRID_webcamera_launch_camera')}
            </StrongButton>
          </>
        ) : (
          <>
            <BodyText className={styles.annotation}>
              {t('STRID_webcamera_disable_camera')}
            </BodyText>
            <BodyText>{t('STRID_webcamera_open_page_by_mobile')}</BodyText>
            <BodyText className="mb-24">{t('STRID_webcamera_be_able_to_copy_link')}</BodyText>
            <UrlCopyButton buttonClass={styles.execButton} buttonType="strong" />
          </>
        )}
      </PageTemplateWithHeader>
    </>
  )
}
export default WebCamera
