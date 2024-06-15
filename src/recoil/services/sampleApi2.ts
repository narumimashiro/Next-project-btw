import { atom, useRecoilState } from 'recoil'

import { useApiStatus } from '@/hooks/useApiStatus'

type SampleApi = {
  text: string
  num: number
}

export const sampleApiState2 = atom<SampleApi>({
  key: 'sample api2 response',
  default: {
    text: 'sample',
    num: 0
  }
})

export const SampleApi2 = () => {
  const {
    status: sampleApiFetchState2,
    startLoading,
    setSuccess,
    setFailed,
    resetStatus: resetSampleApi
  } = useApiStatus()
  const [sampleState, setSampleState] = useRecoilState(sampleApiState2)

  const sampleApi2 = async (result: boolean, seconds: number) => {
    startLoading()

    setTimeout(() => {
      if (result) {
        setSampleState({
          ...sampleState,
          num: 20
        })
        setSuccess()
      } else {
        setFailed()
      }
    }, seconds * 1000)
  }

  return { sampleApiFetchState2, sampleApi2, resetSampleApi }
}
