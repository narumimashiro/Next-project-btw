import { atom, useSetRecoilState } from 'recoil'

import { API_STATUS, type ApiStatusType } from '@/hooks/useApiStatus'

const BASE_URL = 'https://'
const controllers: { [index: number]: AbortController } = {}

export type SampleResponse = {
  id: number
  name: string
}

export type SampleState = {
  [index in number]: {
    response: SampleResponse
    fetchState: ApiStatusType
  }
}

export const sampleData = atom<SampleState>({
  key: 'sample api',
  default: {
    0: {
      response: { id: 0, name: '' },
      fetchState: API_STATUS.IDLE
    }
  }
})

const requestDebounce: { [index: number]: NodeJS.Timeout | null } = {}
export const SampleApi = () => {
  const setSampleData = useSetRecoilState(sampleData)

  const sampleApi = async (index: number) => {
    controllers[index] = new AbortController()

    if (requestDebounce[index]) return
    if (!requestDebounce[index]) {
      requestDebounce[index] = setTimeout(() => {
        requestDebounce[index] = null
      }, 1000 * 0.5)
    }

    setSampleData((pre) => ({
      ...pre,
      [index]: {
        ...pre[index],
        fetchState: API_STATUS.LOADING
      }
    }))

    try {
      const URL = BASE_URL
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: controllers[index]?.signal
      })

      if (!response.ok) throw new Error()

      const result = await response.json()

      setSampleData((pre) => ({
        ...pre,
        [index]: {
          response: result,
          fetchState: API_STATUS.SUCCESS
        }
      }))
    } catch {
      if (controllers[index]?.signal.aborted) {
        setSampleData((pre) => ({
          ...pre,
          [index]: { response: { id: 0, name: '' }, fetchState: API_STATUS.IDLE }
        }))
      } else {
        setSampleData((pre) => ({
          ...pre,
          [index]: {
            response: { id: 0, name: '' },
            fetchState: API_STATUS.FAILED
          }
        }))
      }
    }
  }

  // If you want to cancel or reset individually, implement the function with the index as an argument.
  const resetSampleData = () => {
    setSampleData(() => ({
      0: {
        response: { id: 0, name: '' },
        fetchState: API_STATUS.IDLE
      }
    }))
  }

  const cancelSampleApi = () => {
    for (let i = 0; Object.keys(controllers).length; ++i) {
      controllers[i]?.abort()
    }
  }

  return { sampleApi, resetSampleData, cancelSampleApi }
}
