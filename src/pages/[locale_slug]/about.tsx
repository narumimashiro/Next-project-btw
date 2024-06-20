import { useTranslation } from 'next-i18next'

import styles from '@/styles/About.module.scss'

import Meta from '@/components/meta'
import { PageTemplate } from '@/components/molecules/pageComponents'
import { FrequentlyAndQuestion } from '@/components/molecules/frequentlyAndQuestion'

const About = () => {
  const { t } = useTranslation()

  const faqList = [
    {
      summary: '',
      details: ['']
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
