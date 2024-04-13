import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { useTheme } from '@mui/material'
import { SampleApi } from '@/recoil/services/sampleApi'

// MyComponents
import Meta from "@/components/meta"

import { Accordion } from '@/stories/Accordion/Accordion'

const Home = () => {

  const { t } = useTranslation()
  const colorTheme = useTheme().palette.mode

  const [open, setOpen] = useState(false)
  const temp = {
    width: '300px'
  }

  const onTemp = () => {
    setOpen(false)
    sampleApi(false)
  }

  const { sampleApiFetchState, sampleApi, resetSampleApi } = SampleApi()

  return (
    <>
    {/* TODO change meta title to suit your project */}
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', 'Project Title')}/>
      <div>
        <span>Hello, NextJs!!!</span>
        <button onClick={() => sampleApi(true)}>temp</button>
      </div>
      <div style={{width: 500, marginTop: 100}}>
      <Accordion
        summary={'temp'}
      />
      </div>
      
    </>
  )
}
export default Home