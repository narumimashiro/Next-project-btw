import { atom, useResetRecoilState, useSetRecoilState } from 'recoil'
import { useEffect } from 'react'

import { API_STATUS, ApiStatusType, useApiStatus } from '@/hooks/useApiStatus'

const ALYA_WORD_LIST_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/getWordlist/`
const LOCAL_API_URL = 'http://127.0.0.1:8000/api/v1/getWordlist/'

export type AlyaWordList = {
  id: string
  word_native_lang: string
  word_foreign_lang: string
  registration_date: string
}

export type AlyaWordListStateType = {
  fetchState: ApiStatusType
  response: AlyaWordList[]
}

export const AlyaWordListState = atom<AlyaWordListStateType>({
  key: 'alya word list',
  default: {
    fetchState: API_STATUS.IDLE,
    response: []
  }
})

export const GetAlyaWordListApi = () => {
  const { status, startLoading, setSuccess, setFailed, resetStatus } = useApiStatus()
  const setAlyaWordList = useSetRecoilState(AlyaWordListState)
  const init = useResetRecoilState(AlyaWordListState)

  const getAlyaWordListApi = async () => {
    startLoading()

    try {
      const URL = process.env.NODE_ENV === 'development' ? LOCAL_API_URL : ALYA_WORD_LIST_URL
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) throw new Error()

      const result = await response.json()

      setAlyaWordList((pre) => {
        return {
          ...pre,
          response: result
        }
      })

      setSuccess()
    } catch {
      setFailed()
    }
  }

  useEffect(() => {
    setAlyaWordList((pre) => {
      return {
        ...pre,
        fetchState: status
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const resetAlyaWordListFetchState = () => {
    resetStatus()
    init()
  }

  return {
    getAlyaWordListApi,
    resetAlyaWordListFetchState
  }
}
