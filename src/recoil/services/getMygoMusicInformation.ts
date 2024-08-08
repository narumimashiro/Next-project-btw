import { atom, useSetRecoilState } from 'recoil'
import { useApiStatus } from '@/hooks/useApiStatus'

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

export const MygoMusicInformationState = atom<MygoMusicInformationType[]>({
  key: 'MyGO Music Information',
  default: []
})

export const GetMygoMusicInformationApi = () => {
  const { status, startLoading, setSuccess, setFailed, resetStatus } = useApiStatus()
  const setMygoMusicInformation = useSetRecoilState(MygoMusicInformationState)

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

      setMygoMusicInformation(response.default as MygoMusicInformationType[])

      setSuccess()
    } catch {
      setFailed()
    }
  }

  return {
    mygoMusicInfoFetchState: status,
    getMygoMusicInformation,
    resetGetMygoMusicInfo: resetStatus
  }
}
