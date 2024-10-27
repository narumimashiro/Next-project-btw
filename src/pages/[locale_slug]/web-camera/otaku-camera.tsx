import { GetStaticPaths, GetStaticProps } from 'next'
import { useRef, useState } from 'react'
import { useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import Meta from '@/components/meta'
import { isMobileDevice } from '@/lib/isMobileDevice'
import { BodyText } from '@/components/atom/componentsTemplate'
import { UrlCopyButton } from '@/components/molecules/urlCopyButton'
import { SelectAnimeDrawerMenu } from '@/components/organisms/webCameraComponents'

import styles from '@/styles/WebCamera.module.scss'
import { ViewModal } from '@/stories/Modal/ViewModal'

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

const WebCamera = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const colorTheme = theme.palette.mode

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  const [dataUrl, setDataUrl] = useState('')
  const [openViewer, setOpenViewer] = useState(false)

  const handleCapture = () => {
    if (canvasRef.current && videoRef.current && imgRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const img = imgRef.current

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const context = canvas.getContext('2d')
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        context.drawImage(
          img,
          canvas.width - canvas.width / 2,
          canvas.height - canvas.height / 2 - 16,
          canvas.width / 2,
          canvas.height / 2
        )
        const dataURL = canvas.toDataURL('image/jpeg', 1.0)
        setDataUrl(dataURL)
      }
    }
    setOpenViewer(true)
  }

  const handleDownloadJpeg = () => {
    if (canvasRef.current) {
      canvasRef.current.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = 'captured_image.jpg'
            link.click()
            URL.revokeObjectURL(url)
          }
        },
        'image/jpeg',
        1.0
      )
    }
    setOpenViewer(false)
  }

  return (
    <>
      <div className={styles.container}>
        <video ref={videoRef} className={styles.camera} autoPlay playsInline />
        <img
          ref={imgRef}
          className={styles.image}
          src={'/images/webcamera/mortis.png'}
          alt=""
        />
        <button className={styles.shutter} onClick={handleCapture} />
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
      <ViewModal open={openViewer} colorTheme={colorTheme} onClose={() => setOpenViewer(false)}>
        <img src={dataUrl} alt="" />
        <button onClick={handleDownloadJpeg}>{t('TEMP_ダウンロード')}</button>
      </ViewModal>
    </>
  )
}

const OtakuCamera = () => {
  const { t } = useTranslation()
  const isMobile = isMobileDevice()

  const [selectedAnime, setSelectedAnime] = useState('')

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', t('TEMP_オタクカメラ'))} />
      {!isMobile ? (
        <div className={styles['acquisition-mobile-annotation-container']}>
          <BodyText className={styles.annotation}>
            {t('TEMP_*オタクカメラはPCでは利用できません。')}
          </BodyText>
          <BodyText>
            {t('TEMP_スマホやタブレットなどモバイル端末からこのページを開いてください。')}
          </BodyText>
          <BodyText className="mb-24">
            {t('TEMP_URLコピーボタンからこのページのURLをコピーできます。')}
          </BodyText>
          <UrlCopyButton buttonClass={styles.execButton} buttonType="strong" />
        </div>
      ) : (
        <>
          <div className={styles['otaku-camera']}>
            <WebCamera />
          </div>
          <SelectAnimeDrawerMenu onSelect={setSelectedAnime} />
        </>
      )}
    </>
  )
}
export default OtakuCamera
