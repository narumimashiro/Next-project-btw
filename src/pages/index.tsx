import { useEffect, useState } from 'react'

import { useTranslation } from 'next-i18next'

import styles from '@/styles/Home.module.scss'

import { useCustomContext } from '@/components/customProvider'
import Meta from '@/components/meta'
import { useRedirectUrl } from '@/hooks/redirectUrl'
import { fireOnEnterKey } from '@/lib/utils'

const Home = () => {
  const { t } = useTranslation()
  const { isPortrait } = useCustomContext()
  const { redirectUrl } = useRedirectUrl()

  useEffect(() => {
    // If u want to transition directly to the locale URL on the first access, leave it as is
    // redirectUrl()
  }, [])

  // If u want to transition to the locale URL page by clicking on the title screen, use this func
  const redirectToTop = () => redirectUrl()

  const [dispToTop, setDispToTop] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDispToTop(true)
    }, 1000 * 2)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* TODO change meta title to suit your project */}
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', 'Project Title')} />
      <h1>Hello, NextJs!!!</h1>
      <p>すぐにプロジェクトを開始できます！</p>
      {
        // tap to top
        dispToTop && (
          <div
            className={styles.tapToTop}
            onClick={redirectToTop}
            onKeyDown={fireOnEnterKey(redirectToTop)}
            role="button"
            tabIndex={0}>
            <p className={`absolute-center ${isPortrait ? 'text-sm' : 'text-base'}`}>
              {isPortrait ? t('STRID_tap_to_top') : t('STRID_click_to_top')}
            </p>
          </div>
        )
      }
    </>
  )
}
export default Home
