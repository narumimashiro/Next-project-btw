import { useState, useRef, useEffect } from 'react'

import { useTheme } from '@mui/material'

import prevLight from '@/img/light/arrow_preview.svg'
import nextLight from '@/img/light/arrow_next.svg'
import prevDark from '@/img/dark/arrow_preview.svg'
import nextDark from '@/img/dark/arrow_next.svg'

import styles from './Carousel.module.scss'

export type CarouselProps = {
  colorTheme?: 'light' | 'dark'
  itemList: JSX.Element[]
  itemWidth: number | string
  itemHeight: number
  decorateFeedInOut?: boolean
}
export const Carousel = ({
  colorTheme,
  itemList,
  itemWidth,
  itemHeight,
  decorateFeedInOut
}: CarouselProps) => {
  const theme = useTheme().palette.mode
  const color = colorTheme ? colorTheme : theme
  const MARGIN_ITEM = 10

  const listRef = useRef<HTMLUListElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransition, setIsTransition] = useState(false)
  const allItems: JSX.Element[] = [...itemList.slice(-2), ...itemList, ...itemList.slice(0, 2)]

  useEffect(() => {
    if (listRef.current) {
      listRef.current.style.transition = isTransition ? 'transform .75s ease-out' : 'none'
      if (typeof itemWidth === 'number') {
        listRef.current.style.transform = `translate3d(-${(currentIndex + 1) * (itemWidth + MARGIN_ITEM) + (itemWidth + MARGIN_ITEM) / 2}px, 0, 0)`
      } else {
        const listWidth = listRef.current.offsetWidth * 0.5
        listRef.current.style.transform = `translate3d(-${(currentIndex + 1) * (listWidth + MARGIN_ITEM) + (listWidth + MARGIN_ITEM) / 2}px, 0, 0)`
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isTransition])

  const next = () => {
    if (!isTransition) {
      setCurrentIndex((prevIndex) => prevIndex + 1)
      setIsTransition(true)
    }
  }

  const prev = () => {
    if (!isTransition) {
      setCurrentIndex((prevIndex) => prevIndex - 1)
      setIsTransition(true)
    }
  }

  const handleTransitionEnd = () => {
    setIsTransition(false)
    setCurrentIndex((pre) => (pre + itemList.length) % itemList.length)
  }

  return (
    <div
      className={styles.carousel}
      style={{
        maxWidth: typeof itemWidth === 'number' ? itemWidth * 2 : `calc(${itemWidth} * 2)`
      }}>
      <button
        className={`${styles.carouselButton} ${styles.prev} ${styles[color]}`}
        onClick={prev}>
        <img src={color === 'light' ? prevLight.src : prevDark.src} alt="prev_button" />
      </button>
      <div
        className={`${decorateFeedInOut ? styles.carouselTrackContainer : ''} ${styles[color]}`}>
        <ul
          ref={listRef}
          className={styles.carouselItems}
          style={{ height: itemHeight }}
          onTransitionEnd={handleTransitionEnd}>
          {allItems.map((item, index) => (
            <li key={index} className={styles.carouselItem}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <button
        className={`${styles.carouselButton} ${styles.next} ${styles[color]}`}
        onClick={next}>
        <img src={color === 'light' ? nextLight.src : nextDark.src} alt="next_button" />
      </button>
    </div>
  )
}
