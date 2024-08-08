import { atom, useSetRecoilState } from 'recoil'
import { useApiStatus } from '@/hooks/useApiStatus'

export type JudgePoint = {
  additional_point: number
  is_haruhikage: boolean
}

export type MygoQuizListType = {
  quiz: string
  answer: string[]
  judge_point: JudgePoint
}

export const MygoQuizListState = atom<MygoQuizListType[]>({
  key: 'MyGO Quiz List',
  default: []
})

export const GetMygoQuizListApi = () => {
  const { status, startLoading, setSuccess, setFailed, resetStatus } = useApiStatus()
  const setMygoQuizList = useSetRecoilState(MygoQuizListState)

  const getMygoQuizList = async () => {
    startLoading()

    try {
      const response = await import(`../../../public/assets/ja-jp/mygo-quiz.json`)

      // if (!response.ok) throw new Error()
      // const result: MygoMusicInformationType[] = await response.json()

      setMygoQuizList(response.default as MygoQuizListType[])

      setSuccess()
    } catch {
      setFailed()
    }
  }

  return {
    mygoQuizListFetchState: status,
    getMygoQuizList,
    resetGetMygoQuizList: resetStatus
  }
}
