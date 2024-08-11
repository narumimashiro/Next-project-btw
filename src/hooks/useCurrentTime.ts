/**
 * [Custom hook]
 * get current time
 */

import { useState, useEffect } from 'react'

export const getCurrentTime = () => {
  // return HH : MM
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const colon = String.fromCharCode(0xff1a)

  return `${hours}${colon}${minutes}`
}

export const getCurrentTimeWithDate = (locale: string) => {
  // return HH : MM (D)
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const date = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(now)
  const colon = String.fromCharCode(0xff1a)

  return `${hours}${colon}${minutes} (${date})`
}

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime())
    }, 1 * 1000)

    return () => clearInterval(timer)
  }, [])

  return currentTime
}

export const useCurrentTimeWithDate = (locale: string) => {
  const [currentTime, setCurrentTime] = useState(getCurrentTimeWithDate(locale))

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTimeWithDate(locale))
    }, 1 * 1000)

    return () => clearInterval(timer)
  }, [locale])

  return currentTime
}
