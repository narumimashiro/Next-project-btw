import { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'

import styles from '@/styles/About.module.scss'

import Meta from '@/components/meta'
import { PageTemplate } from '@/components/molecules/pageComponents'
import { FrequentlyAndQuestion } from '@/components/molecules/frequentlyAndQuestion'

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

const About = () => {
  const { t } = useTranslation()

  const faqList = [
    {
      summary: t('STRID_faq_question_1'),
      details: [t('STRID_faq_answer_1_1'), t('STRID_faq_answer_1_2')]
    },
    {
      summary: t('STRID_faq_question_2'),
      details: [t('STRID_faq_answer_2')]
    },
    {
      summary: t('STRID_faq_question_3'),
      details: [t('STRID_faq_answer_3')]
    }
  ]

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', t('STRID_meta_about'))} />
      <PageTemplate>
        <p>すぐにプロジェクトを開始できます！</p>
      </PageTemplate>
      <FrequentlyAndQuestion faqList={faqList} className={styles.faq} />
    </>
  )
}
export default About
