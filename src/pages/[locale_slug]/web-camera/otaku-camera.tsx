import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import Meta from '@/components/meta'
import { isMobileDevice } from '@/lib/isMobileDevice'
import { BodyText } from '@/components/atom/componentsTemplate'
import { UrlCopyButton } from '@/components/molecules/urlCopyButton'
import { SelectAnimeDrawerMenu } from '@/components/organisms/webCameraComponents'

import styles from '@/styles/WebCamera.module.scss'
import { ViewModal } from '@/stories/Modal/ViewModal'
import { Toast } from '@/stories/Toast/Toast'
import { StrongButton } from '@/stories/Button/StrongButton'

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

  const [openToast, setOpenToast] = useState(false)
  const [dataUrl, setDataUrl] = useState('')
  const [openViewer, setOpenViewer] = useState(false)

  useEffect(() => {
    const localhost = process.env.NODE_ENV === 'development'
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: localhost ? 390 : 1920 },
            height: { ideal: localhost ? 650 : 1080 },
            frameRate: { ideal: 30 }
          }
        })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
            videoRef.current.play()
          }
        })
        .catch((err) => {
          setOpenToast(true)
        })
    }
  }, [])

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

        const targetWidth = canvas.width * 0.5
        const targetHeight = canvas.height * 0.5
        const imgAspectRatio = img.naturalWidth / img.naturalHeight
        let drawWidth, drawHeight
        if (imgAspectRatio > 1) {
          drawWidth = targetWidth
          drawHeight = targetWidth / imgAspectRatio
        } else {
          drawWidth = targetHeight * imgAspectRatio
          drawHeight = targetHeight
        }

        context.drawImage(
          img,
          canvas.width - drawWidth,
          canvas.height - drawHeight - 16,
          drawWidth,
          drawHeight
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
        <div className={styles.viewer}>
          <img src={dataUrl} alt="" />
          <StrongButton className={styles.downloadbutton} onClick={handleDownloadJpeg}>
            {t('TEMP_ダウンロード')}
          </StrongButton>
        </div>
      </ViewModal>
      <Toast
        open={openToast}
        onClose={() => setOpenToast(false)}
        message={t('TEMP_カメラにアクセスできませんでした。')}
      />
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
            <SelectAnimeDrawerMenu onSelect={setSelectedAnime} />
          </div>
        </>
      )}
    </>
  )
}
export default OtakuCamera
