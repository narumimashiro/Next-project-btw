import { atom, useResetRecoilState, useSetRecoilState } from 'recoil'
import { useEffect } from 'react'

import { API_STATUS, ApiStatusType, useApiStatus } from '@/hooks/useApiStatus'
import { GetAlyaWordListApi } from '@/recoil/services/getAlyaWordList'

const WORDLIST_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/wordRegistration/`
const LOCAL_API_URL = 'http://127.0.0.1:8000/api/v1/wordRegistration/'

export type RegistrationData = {
  word_native_lang: string
  word_foreign_lang: string
  registration_date: string
}

export type RegistrationDataStateType = {
  fetchState: ApiStatusType
  response: RegistrationData
}

export const RegistrationDataState = atom<RegistrationDataStateType>({
  key: 'word registration data',
  default: {
    fetchState: API_STATUS.IDLE,
    response: {
      word_native_lang: '',
      word_foreign_lang: '',
      registration_date: ''
    }
  }
})

export const PostWordRegistrationApi = () => {
  const { status, startLoading, setSuccess, setFailed, resetStatus } = useApiStatus()
  const setWordRegistration = useSetRecoilState(RegistrationDataState)
  const init = useResetRecoilState(RegistrationDataState)
  const { getAlyaWordListApi } = GetAlyaWordListApi()

  const postWordRegistration = async ({
    base_text,
    translate_text
  }: {
    base_text: string
    translate_text: string
  }) => {
    startLoading()

    try {
      const reqBody = {
        word_native_lang: base_text,
        word_foreign_lang: translate_text
      }

      const URL = process.env.NODE_ENV === 'development' ? LOCAL_API_URL : WORDLIST_API_URL
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      })

      const res = await response.json()

      setWordRegistration((pre) => {
        return {
          ...pre,
          response: res
        }
      })

      setSuccess()
    } catch {
      setFailed()
    }
  }

  useEffect(() => {
    if (API_STATUS.SUCCESS === status) {
      getAlyaWordListApi()
    }
    setWordRegistration((pre) => {
      return {
        ...pre,
        fetchState: status
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const resetWordRegistrationFetchState = () => {
    resetStatus()
    init()
  }

  return {
    postWordRegistration,
    resetWordRegistrationFetchState
  }
}
