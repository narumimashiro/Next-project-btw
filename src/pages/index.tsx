import { useTranslation } from 'next-i18next'

// MyComponents
import Meta from "@/components/meta"

const Home = () => {

  const { t } = useTranslation()

  const { sampleApiFetchState, sampleApi, resetSampleApi } = SampleApi()

  return (
    <>
    {/* TODO change meta title to suit your project */}
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', 'Project Title')}/>
      <div>
        <span>Hello, NextJs!!!</span>
      </div>
    </>
  )
}
export default Home