import type { GetStaticPaths, GetStaticProps } from 'next'

import { useTranslation } from 'next-i18next'

import Meta from '@/components/meta'

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

const Sitemap = () => {
  const { t } = useTranslation()

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', t('STRID_menu_sitemap'))} />
      <p className="absolute-center text-2xl-bold">{t('STRID_cmn_unsupport')}</p>
    </>
  )
}
export default Sitemap
