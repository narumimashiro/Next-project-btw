import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'

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
  const imgRef = useRef<HTMLImageElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)

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
    if (canvasRef.current && videoRef.current && imgRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const img = imgRef.current

      // Canvasの解像度をビデオの解像度に合わせる
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const context = canvas.getContext('2d')
      if (context) {
        // ビデオからフレームをCanvasに描画
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        context.drawImage(img, 0, 0, img.width, img.height)

        // 高品質でJPEG画像を取得
        const dataURL = canvas.toDataURL('image/jpeg', 1.0) // 1.0は最高品質
        setImageSrc(dataURL) // 取得した画像データURLを状態に保存
      }
    }
  }

  // Blobを使用してJPEG画像をダウンロード
  const handleDownloadJPEG = () => {
    if (canvasRef.current) {
      canvasRef.current.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)

            // ダウンロードリンクをクリックして自動ダウンロードを開始
            const link = document.createElement('a')
            link.href = url
            link.download = 'captured_image.jpg'
            link.click()

            // ダウンロード後にBlob URLを解放してメモリを解放
            URL.revokeObjectURL(url)
          }
        },
        'image/jpeg',
        1.0
      )
    }
  }

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', t('TEMP_オタクWebカメラ'))} />
      <div>
        <h1>カメラ画面</h1>
        {/* カメラ映像を表示 */}
        <div style={{ position: 'relative' }}>
          <video
            ref={videoRef}
            style={{ width: '100%', maxWidth: '400px' }}
            autoPlay
            playsInline
          />
          <img
            ref={imgRef}
            alt=""
            src={'/images/alya_icon2.png'}
            style={{ width: '20%', maxWidth: '400px', position: 'absolute', left: 0 }}
          />
        </div>

        {/* 撮影ボタン */}
        <button onClick={handleCapture}>撮影</button>

        {/* 隠れたキャンバス要素 */}
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

        {/* 取得した画像のプレビュー */}
        {imageSrc && (
          <div>
            <h2>撮影した写真</h2>
            <img src={imageSrc} alt="Captured" />
          </div>
        )}

        {/* JPEGでダウンロードボタン */}
        <button onClick={handleDownloadJPEG}>JPEGでダウンロード</button>
      </div>
    </>
  )
}

export default Test
