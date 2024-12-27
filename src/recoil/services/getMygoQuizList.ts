import { useEffect } from 'react'
import { atom, useResetRecoilState, useSetRecoilState } from 'recoil'

import type { ApiStatusType } from '@/hooks/useApiStatus'
import { API_STATUS, useApiStatus } from '@/hooks/useApiStatus'

export type JudgePoint = {
  additional_point: number
  is_haruhikage: boolean
}

export type MygoQuizListType = {
  quiz: string
  answer: string[]
  judge_point: JudgePoint
}

export type MygoQuizListStateType = {
  fetchState: ApiStatusType
  response: MygoQuizListType[]
}

export const MygoQuizListState = atom<MygoQuizListStateType>({
  key: 'MyGO Quiz List',
  default: {
    fetchState: API_STATUS.IDLE,
    response: []
  }
})

export const GetMygoQuizListApi = () => {
  const { status, startLoading, setSuccess, setFailed, resetStatus } = useApiStatus()
  const setMygoQuizList = useSetRecoilState(MygoQuizListState)
  const init = useResetRecoilState(MygoQuizListState)

  const getMygoQuizList = async () => {
    startLoading()

    try {
      const response = await import(`../../../public/assets/ja-jp/mygo-quiz.json`)

      // if (!response.ok) throw new Error()
      // const result: MygoMusicInformationType[] = await response.json()

      setMygoQuizList((pre) => {
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
    setMygoQuizList((pre) => {
      return {
        ...pre,
        fetchState: status
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const resetGetMygoQuizList = () => {
    resetStatus()
    init()
  }

  return {
    getMygoQuizList,
    resetGetMygoQuizList
  }
}
