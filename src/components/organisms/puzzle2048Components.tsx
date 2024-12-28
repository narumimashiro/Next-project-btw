import { useEffect, useState } from 'react'

import { useTheme } from '@mui/material'

import styles from '@/styles/organisms/Puzzle2048Components.module.scss'

import { BOCCHI_PANEL_NUMBER, KITA_PANEL_NUMBER } from '@/lib/puzzle2048Methods'

const useBocchiPanelCtrl = (board: number[][]) => {
  const OPERATION_COUNT = 5
  const [newBoard, setNewBoard] = useState<number[][]>(board)
  const [moveCount, setMoveCount] = useState(0)

  useEffect(() => {
    if (board.some((row) => row.includes(BOCCHI_PANEL_NUMBER))) {
      setMoveCount((pre) => pre + 1)
    } else {
      setMoveCount(0)
    }
  }, [board])

  useEffect(() => {
    if (moveCount > OPERATION_COUNT) {
      const updatedBoard = board.map((row) =>
        row.map((cell) => (cell === BOCCHI_PANEL_NUMBER ? 0 : cell))
      )
      setNewBoard(updatedBoard)
    } else {
      setNewBoard(board)
    }
  }, [board, moveCount])

  return newBoard
}

type Puzzle2048BoardProps = {
  board: number[][]
  updateBoard: (newBoard: number[][]) => void
}

export const Puzzle2048Board = ({ board, updateBoard }: Puzzle2048BoardProps) => {
  const displayBoard = useBocchiPanelCtrl(board)

  useEffect(() => {
    if (JSON.stringify(board) !== JSON.stringify(displayBoard)) {
      updateBoard(displayBoard)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayBoard])

  return (
    <div className={styles.boardContainer}>
      {displayBoard.map((row, i) => (
        <div key={`row-${i}`} className={styles.boardRow}>
          {row.map((cell, j) => (
            <BoardCell key={`cell-${i}-${j}`} number={cell} />
          ))}
        </div>
      ))}
    </div>
  )
}

const BoardCell = ({ number }: { number: number }) => {
  const theme = useTheme()
  const colorTheme = theme.palette.mode

  const displayNumber =
    number === 0
      ? ''
      : number === BOCCHI_PANEL_NUMBER
        ? 'ぼ'
        : number === KITA_PANEL_NUMBER
          ? 'ｷﾀｰﾝ'
          : number

  return (
    <div className={`${styles.boardCell} ${styles[`cell-${colorTheme}-${number}`]}`}>
      {displayNumber}
    </div>
  )
}