import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'

// import styles from '@/styles/Test.module.scss'

import Meta from '@/components/meta'

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

const Test = () => {
  const { t } = useTranslation()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [downloadLink, setDownloadLink] = useState<string | null>(null)

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: 'environment', // 背面カメラを使用する
            width: { ideal: 1920 }, // 理想の幅（高解像度設定）
            height: { ideal: 1080 }, // 理想の高さ（高解像度設定）
            frameRate: { ideal: 30 } // フレームレートを30fpsに設定
          }
        })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
            videoRef.current.play()
          }
        })
        .catch((err) => {
          // console.error('カメラにアクセスできませんでした: ', err)
        })
    }
  }, [])

  const handleCapture = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
        const dataURL = canvas.toDataURL('image/jpeg', 0.8) // JPEG形式で画像を取得
        setImageSrc(dataURL) // 取得した画像データURLを状態に保存
        setDownloadLink(dataURL) // ダウンロードリンク用のデータURLも設定
      }
    }
  }

  const handleDownloadJPEG = () => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL('image/jpeg', 1.0)
      setDownloadLink(dataURL)
    }
  }

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', t('TEMP_オタクWebカメラ'))} />
      <div>
        <h1>カメラ画面</h1>
        {/* カメラ映像を表示 */}
        <video
          ref={videoRef}
          style={{ width: '100%', maxWidth: '400px' }}
          autoPlay
          playsInline
        />

        {/* 撮影ボタン */}
        <button onClick={handleCapture}>撮影</button>

        {/* 隠れたキャンバス要素 */}
        <canvas ref={canvasRef} style={{ display: 'none' }} width="400" height="300"></canvas>

        {/* 取得した画像のプレビュー */}
        {imageSrc && (
          <div>
            <h2>撮影した写真</h2>
            <img src={imageSrc} alt="Captured" />
          </div>
        )}
        <button onClick={handleDownloadJPEG}>Change</button>
        <a href={downloadLink || '#'} download="captured_image.jpg">
          <button>JPEGでダウンロード</button>
        </a>
      </div>
    </>
  )
}
export default Test
