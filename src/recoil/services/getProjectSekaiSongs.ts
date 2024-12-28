import { useEffect } from 'react'
import { atom, useResetRecoilState, useSetRecoilState } from 'recoil'

import type { ApiStatusType } from '@/hooks/useApiStatus'
import { API_STATUS, useApiStatus } from '@/hooks/useApiStatus'

// const BASEURL = 'https://narumimashiro.github.io/ProgramMiku39/Asset/prsk/'
// const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const virtualsinger = 'virtualsinger.json'
const leaoneed = 'leoneed.json'
const moremorejump = 'moremorejump.json'
const vividbadsquad = 'vividbadsquad.json'
const wonderlandsshowtime = 'wonderlandsshowtime.json'
const nightcode = 'nightcode.json'
const fileList = [
  virtualsinger,
  leaoneed,
  moremorejump,
  vividbadsquad,
  wonderlandsshowtime,
  nightcode
]

export type ProjectSekaiSongsInfo = {
  id: string
  unit_name: {
    unit: string
    feat: string
  }
  song_title: string
  artist_name: string
  youtube_src: {
    original: string
    sekai_3d: string
    sekai_2d: string
  }
}

export type ProjectSekaiSongsStateType = {
  fetchState: ApiStatusType
  response: ProjectSekaiSongsInfo[]
}

export const ProjectSekaiSongsState = atom<ProjectSekaiSongsStateType>({
  key: 'Project SEKAI Songs',
  default: {
    fetchState: API_STATUS.IDLE,
    response: []
  }
})

export const CurrentSongsInfoState = atom<{
  currenSongIndex: number
  currentList: ProjectSekaiSongsInfo[]
}>({
  key: 'current selected list and song',
  default: {
    currenSongIndex: 0,
    currentList: []
  }
})

export const GetProjectSekaiSongsApi = () => {
  const { status, startLoading, setSuccess, setFailed, resetStatus } = useApiStatus()
  const setProjectSekaiSongs = useSetRecoilState(ProjectSekaiSongsState)
  const init = useResetRecoilState(ProjectSekaiSongsState)

  const getProjectSekaiSongs = async () => {
    startLoading()

    try {
      for (const fileName of fileList) {
        // const response = await fetch(`${proxyUrl}${BASEURL}${fileName}`, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // })

        // if (!response.ok) throw new Error()

        // const result: ProjectSekaiSongsInfo[] = await response.json()

        const response = await import(`../../../public/assets/prsk/${fileName}`)
        const result = response.default as ProjectSekaiSongsInfo[]

        setProjectSekaiSongs((pre) => {
          const titleList = new Set(pre.response.map((el) => el.song_title))
          const addList = result.filter((el) => !titleList.has(el.song_title))

          return {
            ...pre,
            response: [...pre.response, ...addList].sort((a, b) =>
              a.song_title < b.song_title ? -1 : 1
            )
          }
        })
      }
      // for make it like API
      setTimeout(() => {
        setSuccess()
      }, 1000 * 3.9)
    } catch {
      setFailed()
    }
  }

  useEffect(() => {
    setProjectSekaiSongs((pre) => {
      return {
        ...pre,
        fetchState: status
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const resetprskSongsFetchState = () => {
    resetStatus()
    init()
  }

  return {
    getProjectSekaiSongs,
    resetprskSongsFetchState
  }
}