import { useEffect } from 'react'
import { atom, useResetRecoilState, useSetRecoilState } from 'recoil'

import type { ApiStatusType } from '@/hooks/useApiStatus'
import { API_STATUS, useApiStatus } from '@/hooks/useApiStatus'

export type MusicInfo = {
  title: string
  how_to_read: string
  description: string[]
}

export type MygoMusicInformationType = {
  music_info: MusicInfo
  unique_id: string
  official_site_link: string
  youtube_link: string
}

export type MygoMusicInformationStateType = {
  fetchState: ApiStatusType
  response: MygoMusicInformationType[]
}

export const MygoMusicInformationState = atom<MygoMusicInformationStateType>({
  key: 'MyGO Music Information',
  default: {
    fetchState: API_STATUS.IDLE,
    response: []
  }
})

export const GetMygoMusicInformationApi = () => {
  const { status, startLoading, setSuccess, setFailed, resetStatus } = useApiStatus()
  const setMygoMusicInformation = useSetRecoilState(MygoMusicInformationState)
  const init = useResetRecoilState(MygoMusicInformationState)

  const getMygoMusicInformation = async ({
    lang,
    country
  }: {
    lang: string
    country: string
  }) => {
    startLoading()

    try {
      const language = lang.toLowerCase()
      const region = country.toLowerCase()
      const response = await import(
        `../../../public/assets/${language}-${region}/mygo-music-information.json`
      )

      // if (!response.ok) throw new Error()
      // const result: MygoMusicInformationType[] = await response.json()

      setMygoMusicInformation((pre) => {
        return {
          ...pre,
          response: response.default
        }
      })

      setSuccess()
    } catch {
      setFailed()
    }
  }

  useEffect(() => {
    setMygoMusicInformation((pre) => {
      return {
        ...pre,
        fetchState: status
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const resetGetMygoMusicInfo = () => {
    resetStatus()
    init()
  }

  return {
    getMygoMusicInformation,
    resetGetMygoMusicInfo
  }
}
