import { useState, useEffect } from 'react'

export type TypewriterTextProps = {
  text: string
  speedSeconds?: number
}
export const TypewriterText = ({ text, speedSeconds = 0.1 }: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setDisplayText('')

    const typeInterval = setInterval(() => {
      setCurrentIndex((pre) => {
        if (text.length - 1 <= pre + 1) clearInterval(typeInterval)
        return pre + 1
      })
    }, speedSeconds * 1000)

    return () => clearInterval(typeInterval)
    // eslint-disable-next-line react-hooks/rules-of-hooks
  }, [text])

  useEffect(() => {
    setDisplayText((pre) => {
      return pre + text[currentIndex]
    })
    // eslint-disable-next-line react-hooks/rules-of-hooks
  }, [currentIndex])

  return <div>{displayText}</div>
}
