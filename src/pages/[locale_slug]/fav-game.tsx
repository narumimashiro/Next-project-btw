import type { GetStaticPaths, GetStaticProps } from 'next'

import { useTranslation } from 'next-i18next'

import styles from '@/styles/FavGame.module.scss'

import { useCustomContext } from '@/components/customProvider'
import Meta from '@/components/meta'
import { CatchcopyContext, MyFavGameLinks } from '@/components/organisms/favGameComponents'

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

const FavGame = () => {
  const { t } = useTranslation()
  const { isPortrait, isTabletSize } = useCustomContext()

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', t('TEMP_MyFav.Game'))} />
      {isPortrait ? (
        <div className={styles['page-container-portrait']}>
          <MyFavGameLinks size="single" />
          <div className={styles['page-contents']}>
            <div className={styles.leftpain}>
              <CatchcopyContext isPortrait={true} />
            </div>
          </div>
        </div>
      ) : isTabletSize ? (
        <>
          <MyFavGameLinks size="normal" />
        </>
      ) : (
        <div className={styles['page-container-landscape']}>
          <div className={styles.leftpain}>
            <CatchcopyContext isPortrait={false} />
          </div>
          <div className={styles.rightpain}>
            <MyFavGameLinks size="normal" />
          </div>
        </div>
      )}
    </>
  )
}
export default FavGame
