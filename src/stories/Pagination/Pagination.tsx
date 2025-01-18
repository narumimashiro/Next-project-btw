import { useCallback, useEffect, useMemo, useState } from 'react'

import type { PaletteMode } from '@mui/material'
import { useTheme } from '@mui/material'

import ArrowNextDark from '@/img/dark/arrow_next.svg'
import ArrowPrevDark from '@/img/dark/arrow_preview.svg'
import ArrowNextLight from '@/img/light/arrow_next.svg'
import ArrowPrevLight from '@/img/light/arrow_preview.svg'

import styles from './Pagination.module.scss'

export type PaginationProps = {
  colorTheme?: 'light' | 'dark'
  count: number
  onChange: (page: number) => void
  siblingCount?: number
  size?: 'small' | 'middle' | 'large'
}

export const Pagination = ({
  colorTheme,
  count,
  onChange,
  siblingCount = 1,
  size = 'middle'
}: PaginationProps) => {
  const theme = useTheme()
  const color = colorTheme ? colorTheme : theme.palette.mode
  const PAGE_TOP = 0
  const pageLastIndex = useMemo(() => count - 1, [count])
  const ELLIPSIS = -1
  const BORDER_ITEM_RANGE = 2
  const [currentPage, setCurrentPage] = useState(0)
  const [range, setRange] = useState<number[]>([])
  const [leftSibingIndex, rightSibingIndex, borderLeftEllipsis, borderRightEllipsis] =
    useMemo(() => {
      const left = Math.max(currentPage - siblingCount, PAGE_TOP + BORDER_ITEM_RANGE)
      const right = Math.min(currentPage + siblingCount, pageLastIndex - BORDER_ITEM_RANGE)
      return [
        left,
        right,
        left > PAGE_TOP + BORDER_ITEM_RANGE,
        right < pageLastIndex - BORDER_ITEM_RANGE
      ]
    }, [currentPage, siblingCount, pageLastIndex])

  const isEdgeIndex = useCallback(
    (idx: number) => {
      return (
        BORDER_ITEM_RANGE + siblingCount > idx ||
        pageLastIndex - BORDER_ITEM_RANGE - siblingCount < idx
      )
    },
    [pageLastIndex, siblingCount]
  )

  useEffect(() => {
    const calculateMiddleRange = (): number[] => {
      if (isEdgeIndex(currentPage)) {
        const isEdge = Math.floor(Math.min(2 * 2 + siblingCount * 2 + 1, count) / 2)
        const leftEdge =
          isEdge > currentPage
            ? Math.max(2, isEdge - siblingCount)
            : Math.min(pageLastIndex - 2, pageLastIndex - isEdge - siblingCount)

        return Array.from(
          { length: Math.min(pageLastIndex - 1, leftEdge + 1 + siblingCount * 2) - leftEdge },
          (_, i) => leftEdge + i
        )
      } else {
        return Array.from(
          { length: rightSibingIndex - leftSibingIndex + 1 },
          (_, i) => leftSibingIndex + i
        )
      }
    }

    const buildRange = (): number[] => {
      const range = []
      range.push(PAGE_TOP, ...(borderLeftEllipsis ? [ELLIPSIS] : [PAGE_TOP + 1]))
      range.push(...calculateMiddleRange())
      range.push(...(borderRightEllipsis ? [ELLIPSIS] : [pageLastIndex - 1]), pageLastIndex)
      return range
    }

    setRange(buildRange())
  }, [
    ELLIPSIS,
    borderLeftEllipsis,
    borderRightEllipsis,
    leftSibingIndex,
    pageLastIndex,
    rightSibingIndex,
    currentPage,
    siblingCount,
    isEdgeIndex,
    count
  ])

  const handlePrev = () => handleChangePage(currentPage - 1)
  const handleNext = () => handleChangePage(currentPage + 1)

  const handleChangePage = (page: number) => {
    if (page === ELLIPSIS || page < PAGE_TOP || page > pageLastIndex) return
    setCurrentPage(page)
    onChange(page)
  }

  return (
    <div className={`${styles.BTW_pagination_container} ${styles[size]}`}>
      <CtrlButton color={color} onClick={handlePrev} isPrev size={size} />
      {range.map((el, index) =>
        el !== ELLIPSIS ? (
          <button
            key={index}
            className={`button-active-${color} ${styles.BTW_button} ${styles[size]}
          ${(isEdgeIndex(currentPage) ? currentPage === el : index === (range.length - 1) / 2) ? styles[`BTW_selected-${color}`] : ''}`}
            onClick={() => handleChangePage(el)}>
            {el + 1}
          </button>
        ) : (
          <p key={index} className={`${styles.BTW_ellipsis} ${styles[size]}`}>
            {'...'}
          </p>
        )
      )}
      <CtrlButton color={color} onClick={handleNext} isPrev={false} size={size} />
    </div>
  )
}

const CtrlButton = ({
  color,
  onClick,
  isPrev,
  size
}: {
  color: PaletteMode
  onClick: () => void
  isPrev: boolean
  size: 'small' | 'middle' | 'large'
}) => {
  const isLight = color === 'light'
  const imgSrc = useMemo(
    () =>
      isPrev
        ? isLight
          ? ArrowPrevLight.src
          : ArrowPrevDark.src
        : isLight
          ? ArrowNextLight.src
          : ArrowNextDark.src,
    [isLight, isPrev]
  )
  return (
    <button
      className={`button-active-${color} ${styles.BTW_button} ${styles[size]}`}
      onClick={onClick}>
      <img src={imgSrc} alt="" />
    </button>
  )
}
