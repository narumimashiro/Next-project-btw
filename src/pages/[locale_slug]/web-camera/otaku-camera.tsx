import type { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect, useMemo, useRef, useState } from 'react'

import { useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import styles from '@/styles/WebCamera.module.scss'

import { BodyText } from '@/components/atom/componentsTemplate'
import Meta from '@/components/meta'
import { UrlCopyButton } from '@/components/molecules/urlCopyButton'
import {
  CharacterList,
  convertStridToImgfilename,
  SelectAnimeDrawerMenu,
  SelectorCharacter
} from '@/components/organisms/webCameraComponents'
import { isMobileDevice } from '@/lib/isMobileDevice'

import { StrongButton } from '@/stories/Button/StrongButton'
import { ViewModal } from '@/stories/Modal/ViewModal'
import { Toast } from '@/stories/Toast/Toast'

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

type WebcameraProps = {
  characterGroup: string
}
const WebCamera = ({ characterGroup }: WebcameraProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const colorTheme = theme.palette.mode

  const characterList = useMemo(
    () => CharacterList.find((el) => characterGroup === el.group)?.members || [],
    [characterGroup]
  )
  const [selectedChara, setSelectedChara] = useState('')
  const charaImage = useMemo(
    () =>
      selectedChara ? `/images/webcamera/${convertStridToImgfilename(selectedChara)}` : '',
    [selectedChara]
  )

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
        .catch(() => {
          setOpenToast(true)
        })
    }
  }, [])

  useEffect(() => {
    // for save image by long pressing
    const canvas = canvasRef.current
    const saveImage = () => {
      if (canvas) {
        const dataURL = canvas.toDataURL('image/jpeg', 1.0)
        canvas.setAttribute('data-url', dataURL)
      }
    }
    canvas?.addEventListener('touchend', saveImage)

    return () => {
      canvas?.removeEventListener('touchend', saveImage)
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
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video ref={videoRef} className={styles.camera} autoPlay playsInline />
        <img ref={imgRef} className={styles.image} src={charaImage} alt="" />
        <div className={styles.camerafunction}>
          <SelectorCharacter characterList={characterList} selectChara={setSelectedChara} />
          <button
            className={`${styles.shutter} ${styles[colorTheme]}`}
            onClick={handleCapture}
          />
        </div>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
      <ViewModal open={openViewer} colorTheme={colorTheme} onClose={() => setOpenViewer(false)}>
        <div className={styles.viewer}>
          <img src={dataUrl} alt="" />
          <StrongButton className={styles.downloadbutton} onClick={handleDownloadJpeg}>
            {t('STRID_cmn_download')}
          </StrongButton>
        </div>
      </ViewModal>
      <Toast
        open={openToast}
        onClose={() => setOpenToast(false)}
        message={t('STRID_webcamera_cannnot_access_camera')}
      />
    </>
  )
}

const OtakuCamera = () => {
  const { t } = useTranslation()
  const isMobile = isMobileDevice()

  const [selectedGroup, setSelectedGroup] = useState(CharacterList[0].group)

  return (
    <>
      <Meta
        pageTitle={t('STRID_cmn_pagetitle').replace('{var}', t('STRID_meta_otaku_webcamera'))}
      />
      {!isMobile ? (
        <div className={styles['acquisition-mobile-annotation-container']}>
          <BodyText className={styles.annotation}>
            {t('STRID_webcamera_disable_camera')}
          </BodyText>
          <BodyText>{t('STRID_webcamera_open_page_by_mobile')}</BodyText>
          <BodyText className="mb-24">{t('STRID_webcamera_be_able_to_copy_link')}</BodyText>
          <UrlCopyButton buttonClass={styles.execButton} buttonType="strong" />
        </div>
      ) : (
        <>
          <div className={styles['otaku-camera']}>
            <WebCamera characterGroup={selectedGroup} />
            <SelectAnimeDrawerMenu onSelect={setSelectedGroup} />
          </div>
        </>
      )}
    </>
  )
}
export default OtakuCamera
