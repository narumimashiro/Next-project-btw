import { useState, useEffect, useRef } from 'react'

export type QuizQuickBuzzerTextProps = {
  text: string
  speedSeconds?: number
  pause: boolean
  setPushPoint?: (textCount: number) => void
}

export const QuizQuickBuzzerText = ({
  text,
  speedSeconds = 0.1,
  pause,
  setPushPoint
}: QuizQuickBuzzerTextProps) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const typeInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setCurrentIndex(0)
    setDisplayText('')
  }, [text])

  useEffect(() => {
    if (pause) {
      if (typeInterval.current) {
        clearInterval(typeInterval.current)
        typeInterval.current = null
      }
    } else {
      if (text.length <= currentIndex) return
      typeInterval.current = setInterval(() => {
        setCurrentIndex((pre) => {
          if (pre + 1 >= text.length) {
            if (typeInterval.current) {
              clearInterval(typeInterval.current)
            }
            return pre
          }
          return pre + 1
        })
      }, speedSeconds * 1000)
    }

    return () => {
      if (typeInterval.current) {
        clearInterval(typeInterval.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, pause, currentIndex])

  useEffect(() => {
    if (currentIndex < text.length) {
      setDisplayText((pre) => pre + text[currentIndex])
    }

    if (setPushPoint) setPushPoint(currentIndex + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])

  return <div>{displayText}</div>
}
