import { atom, useRecoilState } from 'recoil'

import { useApiStatus } from '@/hooks/useApiStatus'

type SampleApi = {
  text: string
  num: number
}

export const sampleApiState = atom<SampleApi>({
  key: 'sample api response',
  default: {
    text: 'sample',
    num: 0
  }
})

export const SampleApi = () => {
  const {
    status: sampleApiFetchState,
    startLoading,
    setSuccess,
    setFailed,
    resetStatus: resetSampleApi
  } = useApiStatus()
  const [samapleState, setSampleState] = useRecoilState(sampleApiState)

  const sampleApi = async (result: boolean, seconds: number) => {
    startLoading()

    setTimeout(() => {
      if (result) {
        setSampleState({
          ...samapleState,
          num: 10
        })
        setSuccess()
      } else {
        setFailed()
      }
    }, seconds * 1000)
  }

  return { sampleApiFetchState, sampleApi, resetSampleApi }
}
