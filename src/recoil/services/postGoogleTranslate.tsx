import { useEffect } from 'react'
import { atom, useResetRecoilState, useSetRecoilState } from 'recoil'

import type { ApiStatusType } from '@/hooks/useApiStatus'
import { API_STATUS, useApiStatus } from '@/hooks/useApiStatus'

const GOOGLE_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/translation/`
const LOCAL_API_URL = 'http://127.0.0.1:8000/api/v1/translation/'

export type TranslateData = {
  original_text: string
  translated_text: string
}

export type TranslationDataStateType = {
  fetchState: ApiStatusType
  response: TranslateData
}

export const TranslationDataState = atom<TranslationDataStateType>({
  key: 'current google translation data',
  default: {
    fetchState: API_STATUS.IDLE,
    response: {
      original_text: '',
      translated_text: ''
    }
  }
})

export const PostGoogleTranslateApi = () => {
  const { status, startLoading, setSuccess, setFailed, resetStatus } = useApiStatus()
  const setTranslateData = useSetRecoilState(TranslationDataState)
  const init = useResetRecoilState(TranslationDataState)

  const postGoogleTranslation = async ({
    text,
    language
  }: {
    text: string
    language: string
  }) => {
    // init
    startLoading()

    try {
      const reqBody = {
        text: text,
        lang: language
      }

      const URL = process.env.NODE_ENV === 'development' ? LOCAL_API_URL : GOOGLE_API_URL
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      })

      if (!response.ok) throw new Error()

      const res = await response.json()

      setTranslateData((pre) => {
        return {
          ...pre,
          response: {
            original_text: text,
            translated_text: res.translated_text
          }
        }
      })

      setSuccess()
    } catch {
      setFailed()
    }
  }

  useEffect(() => {
    setTranslateData((pre) => {
      return {
        ...pre,
        fetchState: status
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const resetGoogleTranslationFetchState = () => {
    resetStatus()
    init()
  }

  return {
    postGoogleTranslation,
    resetGoogleTranslationFetchState
  }
}
