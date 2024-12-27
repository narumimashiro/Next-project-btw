import type { GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { Grid, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import styles from '@/styles/PrskMusic.module.scss'

import Loading from '@/components/atom/loading'
import { YoutubeViewer } from '@/components/atom/youtubeViewer'
import { useCustomContext } from '@/components/customProvider'
import Meta from '@/components/meta'
import { PageTemplateWithHeader } from '@/components/molecules/pageComponents'
import {
  ProjectSekaiFooter,
  PrskMusicList,
  PrskMusicPlayer
} from '@/components/organisms/prskComponents'
import { API_STATUS } from '@/hooks/useApiStatus'
import {
  GetProjectSekaiSongsApi,
  ProjectSekaiSongsState
} from '@/recoil/services/getProjectSekaiSongs'

import { Drawer } from '@/stories/Drawer/Drawer'
import { ViewModal } from '@/stories/Modal/ViewModal'
import { OutlineText } from '@/stories/Text/OutlineText'

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

const TextDecoration = ({ openSmartphone }: { openSmartphone: boolean }) => {
  const outlineCustomColor = {
    light: {
      backgroundColor: '#ffffff',
      outlineColor: '#7ed'
    },
    dark: {
      backgroundColor: '#ffffff',
      outlineColor: '#7ed'
    }
  }

  return (
    <div
      className={`${styles.outlineText} ${openSmartphone ? styles.display : styles.displayNone}`}>
      <OutlineText
        className={styles.middle}
        text="Project SEKAI"
        customColor={outlineCustomColor}
      />
      <OutlineText
        className={styles.large}
        text="COLORFUL STAGE!"
        customColor={outlineCustomColor}
      />
      <OutlineText
        className={styles.middle}
        text="feat. HATSUNE MIKU"
        customColor={outlineCustomColor}
      />
    </div>
  )
}

const PrskMusic = () => {
  const { t } = useTranslation()
  const { isPortrait } = useCustomContext()
  const theme = useTheme()
  const colorTheme = theme.palette.mode
  const { getProjectSekaiSongs } = GetProjectSekaiSongsApi()
  const projectSekaiSongs = useRecoilValue(ProjectSekaiSongsState).response
  const prskSongsFetchState = useRecoilValue(ProjectSekaiSongsState).fetchState

  const [openSmartphone, setOpenSmartphone] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [selectYoutubeSrc, setSelectYoutubeSrc] = useState('')

  useEffect(() => {
    if (prskSongsFetchState === API_STATUS.IDLE) {
      getProjectSekaiSongs()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prskSongsFetchState])

  const closeYoutubeModal = () => {
    setOpenViewModal(false)
    setSelectYoutubeSrc('')
  }

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', t('STRID_meta_prsk_music'))} />
      <PageTemplateWithHeader
        className={`mb-16 ${openSmartphone && isPortrait ? styles.pageWrap : ''}`}
        imgSrc={'/images/project_sekai_virtual.png'}
        title={t('STRID_meta_prsk_music')}>
        <>
          {prskSongsFetchState === API_STATUS.SUCCESS ? (
            <Grid container>
              <Grid item xs={isPortrait ? 12 : 6}>
                <PrskMusicList
                  musicList={projectSekaiSongs}
                  onOpenSmartphone={() => setOpenSmartphone(true)}
                />
              </Grid>
              {!isPortrait && (
                <Grid item xs={isPortrait ? 12 : 6} className="flex-center">
                  <div className={`${styles.smartPhone} ${styles[colorTheme]}`}>
                    <PrskMusicPlayer
                      onSetSelectYoutubeSrc={setSelectYoutubeSrc}
                      onPlayMusic={() => setOpenViewModal(true)}
                    />
                  </div>
                </Grid>
              )}
            </Grid>
          ) : prskSongsFetchState === API_STATUS.FAILED ? (
            <></>
          ) : (
            <div className={styles.loading}>
              <Loading />
            </div>
          )}
        </>
      </PageTemplateWithHeader>
      {isPortrait ? (
        <>
          <TextDecoration openSmartphone={openSmartphone} />
          <Drawer open={openSmartphone} pos="bottom" onClose={() => setOpenSmartphone(false)}>
            <PrskMusicPlayer
              onSetSelectYoutubeSrc={setSelectYoutubeSrc}
              onPlayMusic={() => setOpenViewModal(true)}
            />
          </Drawer>
        </>
      ) : null}
      <ViewModal open={openViewModal} onClose={closeYoutubeModal} colorTheme={colorTheme}>
        <YoutubeViewer
          width={'100%'}
          height={'100%'}
          srcId={selectYoutubeSrc}
          autoPlay={true}
          mute={false}
        />
      </ViewModal>
      <ProjectSekaiFooter />
    </>
  )
}
export default PrskMusic
