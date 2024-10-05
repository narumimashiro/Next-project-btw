/**
 * [Custom hook]
 * get api fetch status
 */

import { useState, useCallback } from 'react'

export const API_STATUS = {
  IDLE: 'API_FETCH_IDLE',
  LOADING: 'API_FETCH_LOADING',
  SUCCESS: 'API_FETCH_SUCCESS',
  FAILED: 'API_FETCH_FAILED'
} as const

export type ApiStatusType = (typeof API_STATUS)[keyof typeof API_STATUS]

export const useApiStatus = () => {
  const [status, setStatus] = useState<ApiStatusType>(API_STATUS.IDLE)

  const startLoading = useCallback(() => {
    setStatus(API_STATUS.LOADING)
  }, [])

  const setSuccess = useCallback(() => {
    setStatus(API_STATUS.SUCCESS)
  }, [])

  const setFailed = useCallback(() => {
    setStatus(API_STATUS.FAILED)
  }, [])

  const resetStatus = useCallback(() => {
    setStatus(API_STATUS.IDLE)
  }, [])

  return { status, startLoading, setSuccess, setFailed, resetStatus }
}
