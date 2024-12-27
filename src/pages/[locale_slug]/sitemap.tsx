import type { GetStaticPaths, GetStaticProps } from 'next'

import { useTranslation } from 'next-i18next'

import styles from '@/styles/Sitemap.module.scss'

import { HeadlineText, SubTitleText } from '@/components/atom/componentsTemplate'
import { useCustomContext } from '@/components/customProvider'
import Meta from '@/components/meta'
import { useLocaleSlug } from '@/hooks/useLocaleSlug'
import { useManageMenuHidden } from '@/recoil/manageMenu'

import { TextLink } from '@/stories/Link/TextLink'

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

type LinkGroupingProps = {
  groupingTitle: string
  linkList: {
    text: string
    src: string
  }[]
}
const LinkGrouping = ({ groupingTitle, linkList }: LinkGroupingProps) => {
  const { isPortrait } = useCustomContext()

  return (
    <div className={styles.linkGroup}>
      <SubTitleText className="mb-16">{groupingTitle}</SubTitleText>
      <div className={styles[`grid-${isPortrait ? 'portrait' : 'landscape'}`]}>
        {linkList.map((link) => (
          <TextLink key={link.text} href={link.src} text={link.text} />
        ))}
      </div>
    </div>
  )
}

const Sitemap = () => {
  const { t } = useTranslation()
  const { isPortrait } = useCustomContext()
  const locale = useLocaleSlug()
  useManageMenuHidden()

  /**
   * Sitemap contents list
   */
  const topContents = [{ text: t('STRID_sitemap_top'), src: `/${locale}` }]
  const hobbyContents = [
    {
      text: t('STRID_meta_prsk_music'),
      src: `/${locale}/prsk-music`
    },
    {
      text: t('STRID_meta_mygo_quiz'),
      src: `/${locale}/mygo-quiz`
    },
    {
      text: t('STRID_meta_alya'),
      src: `/${locale}/alya-russian`
    },
    {
      text: t('STRID_meta_otaku_webcamera'),
      src: `/${locale}/web-camera/otaku-camera`
    }
  ]
  const otherContents = [
    {
      text: t('STRID_meta_about'),
      src: `/${locale}/about`
    }
  ]

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', t('STRID_menu_sitemap'))} />
      <div className={`${styles['page-container']} ${isPortrait ? styles.portrait : ''}`}>
        <HeadlineText className="mb-24">{t('STRID_menu_sitemap')}</HeadlineText>
        <div className={styles['contents-container']}>
          <LinkGrouping groupingTitle={t('STRID_sitemap_top')} linkList={topContents} />
          <LinkGrouping groupingTitle={t('STRID_sitemap_hobby')} linkList={hobbyContents} />
          <LinkGrouping groupingTitle={t('STRID_sitemap_other')} linkList={otherContents} />
        </div>
      </div>
    </>
  )
}
export default Sitemap
