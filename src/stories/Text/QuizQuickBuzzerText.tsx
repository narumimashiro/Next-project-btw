import { useState, useEffect, useRef } from 'react'

export type QuizQuickBuzzerTextProps = {
  text: string
  speedSeconds?: number
  pause: boolean
}

export const QuizQuickBuzzerText = ({
  text,
  speedSeconds = 0.1,
  pause
}: QuizQuickBuzzerTextProps) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(-1)
  const typeInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (pause) {
      if (typeInterval.current) {
        clearInterval(typeInterval.current)
        typeInterval.current = null
      }
    } else {
      if (text.length - 1 <= currentIndex) return
      typeInterval.current = setInterval(() => {
        setCurrentIndex((pre) => {
          if (typeInterval.current) {
            if (text.length - 1 <= pre + 1) clearInterval(typeInterval.current)
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
  }, [pause])

  useEffect(() => {
    setDisplayText((pre) => {
      return pre + text[currentIndex]
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])

  useEffect(() => {
    setDisplayText('')
  }, [text])

  return <div>{displayText}</div>
}
