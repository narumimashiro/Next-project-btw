/**
 * 2048 Game special rules
 * 1. Bocchi panel is only 1 cell (Drop rate: 3%)
 * 2. Kita panel is only 1 cell (Drop rate: 3%)
 */

export const PANEL_NUMBER_TWO = 2
export const PANEL_NUMBER_FOUR = 4
export const BOCCHI_PANEL_NUMBER = 1
export const KITA_PANEL_NUMBER = 194

export const addRandomNumber = (board: number[][]) => {
  const emptyCells = []
  for (let i = 0; i < board.length; ++i) {
    for (let j = 0; j < board[i].length; ++j) {
      if (board[i][j] === 0) {
        emptyCells.push({ x: i, y: j })
      }
    }
  }
  if (emptyCells.length === 0) {
    return board
  }
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
  board[randomCell.x][randomCell.y] = pickAddNumber(board)
  return board
}

const pickAddNumber = (board: number[][]) => {
  const randomNumber = Math.floor(Math.random() * 100)
  if (randomNumber < 3) {
    // Rule : Bocchi panel is only 1
    return board.some((row) => row.includes(BOCCHI_PANEL_NUMBER))
      ? PANEL_NUMBER_TWO
      : BOCCHI_PANEL_NUMBER
  } else if (3 <= randomNumber && randomNumber < 6) {
    // Rule : Kita panel is only 1
    return board.some((row) => row.includes(KITA_PANEL_NUMBER))
      ? PANEL_NUMBER_TWO
      : KITA_PANEL_NUMBER
  } else if (6 <= randomNumber && randomNumber < 90) {
    return PANEL_NUMBER_TWO
  } else {
    return PANEL_NUMBER_FOUR
  }
}

const moveLeft = (board: number[][]): number[][] => {
  return board.map((row) => {
    const nonZero = row.filter((cell) => 0 != cell)
    return nonZero.concat(Array(row.length - nonZero.length).fill(0))
  })
}

const moveRight = (board: number[][]): number[][] => {
  return board.map((row) => {
    const nonZero = row.filter((cell) => 0 != cell)
    return Array(row.length - nonZero.length)
      .fill(0)
      .concat(nonZero)
  })
}

export const convertColumnToRow = (board: number[][]): number[][] => {
  return Array.from({ length: board.length }, (_, i) => board.map((row) => row[i]))
}

export const addNumberLeftside = (board: number[][]): number[][] => {
  return board.map((row) => {
    for (let i = 0; i < row.length - 1; ++i) {
      if (KITA_PANEL_NUMBER === row[i] || KITA_PANEL_NUMBER === row[i + 1]) {
        // Kita chan panel is enabled to add number
        if (BOCCHI_PANEL_NUMBER === row[i] || BOCCHI_PANEL_NUMBER === row[i + 1]) {
          row[i] = 0
        } else {
          if (0 != row[i] && 0 != row[i + 1]) {
            row[i] = (row[i] + row[i + 1] - KITA_PANEL_NUMBER) * 2
          } else {
            row[i] = KITA_PANEL_NUMBER
          }
        }
        row[i + 1] = 0
      }
      if (row[i] === row[i + 1]) {
        row[i] *= 2
        row[i + 1] = 0
      }
    }
    return row
  })
}

export const addNumberRightside = (board: number[][]): number[][] => {
  return board.map((row) => {
    for (let i = row.length - 1; i > 0; --i) {
      if (KITA_PANEL_NUMBER === row[i] || KITA_PANEL_NUMBER === row[i - 1]) {
        // Kita chan panel is enabled to add number
        if (BOCCHI_PANEL_NUMBER === row[i] || BOCCHI_PANEL_NUMBER === row[i - 1]) {
          row[i] = 0
        } else {
          if (0 != row[i] && 0 != row[i - 1]) {
            row[i] = (row[i] + row[i - 1] - KITA_PANEL_NUMBER) * 2
          } else {
            row[i] = KITA_PANEL_NUMBER
          }
        }
        row[i - 1] = 0
      }
      if (row[i] === row[i - 1]) {
        row[i] *= 2
        row[i - 1] = 0
      }
    }
    return row
  })
}

export const handleMoveLeft = (board: number[][]): number[][] => {
  return addRandomNumber(moveLeft(addNumberLeftside(moveLeft(board))))
}

export const handleMoveRight = (board: number[][]): number[][] => {
  return addRandomNumber(moveRight(addNumberRightside(moveRight(board))))
}

export const handleMoveUp = (board: number[][]): number[][] => {
  return convertColumnToRow(handleMoveLeft(convertColumnToRow(board)))
}

export const handleMoveDown = (board: number[][]): number[][] => {
  return convertColumnToRow(handleMoveRight(convertColumnToRow(board)))
}
