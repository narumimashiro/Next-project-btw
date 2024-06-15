import { useState, useEffect, useRef } from 'react'

import styles from './MarqueeText.module.scss'

export type MarqueeTextProps = {
  text: string
}

export const MarqueeText = ({ text }: MarqueeTextProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLSpanElement | null>(null)
  const [excessiveLength, setExcessiveLengh] = useState(false)

  useEffect(() => {
    const calcTextWidth = () => {
      if (textRef.current && containerRef.current) {
        const textRefWidth = textRef.current.offsetWidth
        const containerRefWidth = containerRef.current.offsetWidth
        setExcessiveLengh(textRefWidth > containerRefWidth)
      }
    }

    calcTextWidth()
    window.addEventListener('resize', calcTextWidth)

    return () => window.removeEventListener('resize', calcTextWidth)
  }, [])

  useEffect(() => {
    if (textRef.current) {
      const duration = textRef.current.offsetWidth / 100
      textRef.current.style.setProperty('--scroll-duration', `${duration}s`)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${excessiveLength ? styles.scrollText : ''}`}>
      <span ref={textRef}>{text}</span>
    </div>
  )
}
