import { GetStaticPaths, GetStaticProps } from 'next'
import router from 'next/router'
import { useTranslation } from 'next-i18next'

// MyComponents
import Meta from '@/components/meta'
import { PageTemplate } from '@/components/molecules/pageComponents'
import { useUserColorTheme } from '@/hooks/useThemeStyle'
import { FrequentlyAndQuestion } from '@/components/molecules/frequentlyAndQuestion'
import { useLocaleSlug } from '@/hooks/useLocaleSlug'
import { BasicButton } from '@/stories/Button/BasicButton'

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

const MainPage = () => {
  const { t } = useTranslation()
  const locale = useLocaleSlug()

  const { setColorTheme } = useUserColorTheme()
  const changeDarkMode = () => {
    setColorTheme('dark')
  }
  const changeLightMode = () => {
    setColorTheme('light')
  }
  const changeCustomMode = () => {
    setColorTheme('custom')
  }

  const faqs = [
    {
      summary: 'test',
      details: ['text']
    }
  ]

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', t('STRID_meta_top'))} />
      <PageTemplate>
        <p>すぐにプロジェクトを開始できます！</p>
        <BasicButton className="mb-8" onClick={changeDarkMode}>
          Change Dark
        </BasicButton>
        <BasicButton className="mb-8" onClick={changeLightMode}>
          Change Light
        </BasicButton>
        <BasicButton className="mb-24" onClick={changeCustomMode}>
          Change Custom
        </BasicButton>
        <BasicButton className="mb-8" onClick={() => router.push(`${locale}/about`)}>
          To about me
        </BasicButton>
        <BasicButton className="mb-8" onClick={() => router.push(`${locale}/prsk-music`)}>
          To prsk music
        </BasicButton>
        <BasicButton className="mb-8" onClick={() => router.push(`${locale}/mygo-quiz`)}>
          To MyGO!!!!! Quiz
        </BasicButton>
        <BasicButton className="mb-8" onClick={() => router.push(`${locale}/alya-russian`)}>
          To Alya Russian
        </BasicButton>
        <BasicButton className="mb-8" onClick={() => router.push(`${locale}/test`)}>
          To Test
        </BasicButton>
      </PageTemplate>
      <FrequentlyAndQuestion faqList={faqs} />
    </>
  )
}
export default MainPage
