/**
 * 2048 Game special rules
 * 1. Bocchi panel is only 1 cell (Drop rate: 3%)
 * 2. Kita panel is only 1 cell (Drop rate: 3%)
 * 3. Nijika panel equals number 2 panel (Drop rate: 5%)
 * 4. If Nijika panel is generated, background turns rainbow-colored (Rate: about 1%)
 */

export const PANEL_NUMBER_EMPTY = 0
export const PANEL_NUMBER_TWO = 2
export const PANEL_NUMBER_FOUR = 4
export const BOCCHI_PANEL_NUMBER = 1
export const NIJIKA_PANEL_NUMBER = 2.5
export const KITA_PANEL_NUMBER = 194
export const RYO_PANEL_NUMBER = 3

const castNumber = (number: number): number => {
  return Math.floor(number)
}

export const addRandomNumber = (board: number[][]) => {
  const emptyCells = []
  for (let i = 0; i < board.length; ++i) {
    for (let j = 0; j < board[i].length; ++j) {
      if (board[i][j] === PANEL_NUMBER_EMPTY) {
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
    return judgeBocchiPanel(board)
  } else if (3 <= randomNumber && randomNumber < 6) {
    return judgeKitaPanel(board)
  } else if (6 <= randomNumber && randomNumber < 9) {
    return judgeRyoPanel(board)
  } else if (9 <= randomNumber && randomNumber < 90) {
    return judgeNijikaPanel()
  } else {
    return PANEL_NUMBER_FOUR
  }
}

const judgeBocchiPanel = (board: number[][]): number => {
  // 1. Bocchi panel is only 1 cell (Drop rate: 3%)
  return board.some((row) => row.includes(BOCCHI_PANEL_NUMBER))
    ? PANEL_NUMBER_TWO
    : BOCCHI_PANEL_NUMBER
}

const judgeNijikaPanel = (): number => {
  // 3. Nijika panel equals number 2 panel (Drop rate: about 4%)
  return Math.floor(Math.random() * 100) < 5 ? NIJIKA_PANEL_NUMBER : PANEL_NUMBER_TWO
}

const judgeKitaPanel = (board: number[][]): number => {
  // 2. Kita panel is only 1 cell (Drop rate: 3%)
  return board.some((row) => row.includes(KITA_PANEL_NUMBER))
    ? judgeNijikaPanel()
    : KITA_PANEL_NUMBER
}

const judgeRyoPanel = (board: number[][]): number => {
  // 5. Ryo panel is only 1 cell (Drop rate: 3%)
  return board.some((row) => row.includes(RYO_PANEL_NUMBER))
    ? judgeNijikaPanel()
    : RYO_PANEL_NUMBER
}

const moveLeft = (board: number[][]): number[][] => {
  return board.map((row) => {
    const nonZero = row.filter((cell) => PANEL_NUMBER_EMPTY != cell)
    return nonZero.concat(Array(row.length - nonZero.length).fill(PANEL_NUMBER_EMPTY))
  })
}

const moveRight = (board: number[][]): number[][] => {
  return board.map((row) => {
    const nonZero = row.filter((cell) => PANEL_NUMBER_EMPTY != cell)
    return Array(row.length - nonZero.length)
      .fill(PANEL_NUMBER_EMPTY)
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
        const { baseNumber, combinedNum } = additionControlKitachan(row[i], row[i + 1])
        row[i] = baseNumber
        row[i + 1] = combinedNum
      } else if (RYO_PANEL_NUMBER === row[i] || RYO_PANEL_NUMBER === row[i + 1]) {
        const { baseNumber, combinedNum } = additionControlRyochan(row[i], row[i + 1])
        row[i] = baseNumber
        row[i + 1] = combinedNum
      } else if (castNumber(row[i]) === castNumber(row[i + 1])) {
        row[i] = castNumber(row[i]) * 2
        row[i + 1] = PANEL_NUMBER_EMPTY
      }
    }
    return row
  })
}

export const addNumberRightside = (board: number[][]): number[][] => {
  return board.map((row) => {
    for (let i = row.length - 1; i > 0; --i) {
      if (KITA_PANEL_NUMBER === row[i] || KITA_PANEL_NUMBER === row[i - 1]) {
        const { baseNumber, combinedNum } = additionControlKitachan(row[i], row[i - 1])
        row[i] = baseNumber
        row[i - 1] = combinedNum
      } else if (RYO_PANEL_NUMBER === row[i] || RYO_PANEL_NUMBER === row[i - 1]) {
        const { baseNumber, combinedNum } = additionControlRyochan(row[i], row[i - 1])
        row[i] = baseNumber
        row[i - 1] = combinedNum
      } else if (castNumber(row[i]) === castNumber(row[i - 1])) {
        row[i] = castNumber(row[i]) * 2
        row[i - 1] = PANEL_NUMBER_EMPTY
      }
    }
    return row
  })
}

const additionControlKitachan = (baseNum: number, combinedNum: number) => {
  if (BOCCHI_PANEL_NUMBER === baseNum || BOCCHI_PANEL_NUMBER === combinedNum) {
    return { baseNumber: PANEL_NUMBER_EMPTY, combinedNum: PANEL_NUMBER_EMPTY }
  } else if (RYO_PANEL_NUMBER === baseNum || RYO_PANEL_NUMBER === combinedNum) {
    return { baseNumber: RYO_PANEL_NUMBER, combinedNum: RYO_PANEL_NUMBER }
  } else {
    if (PANEL_NUMBER_EMPTY != baseNum && PANEL_NUMBER_EMPTY != combinedNum) {
      return {
        baseNumber: castNumber(baseNum + combinedNum - KITA_PANEL_NUMBER) * 2,
        combinedNum: PANEL_NUMBER_EMPTY
      }
    } else {
      return { baseNumber: KITA_PANEL_NUMBER, combinedNum: PANEL_NUMBER_EMPTY }
    }
  }
}

const additionControlRyochan = (baseNum: number, combinedNum: number) => {
  if (
    BOCCHI_PANEL_NUMBER === baseNum ||
    BOCCHI_PANEL_NUMBER === combinedNum ||
    KITA_PANEL_NUMBER === baseNum ||
    KITA_PANEL_NUMBER === combinedNum ||
    (RYO_PANEL_NUMBER === baseNum && RYO_PANEL_NUMBER === combinedNum)
  ) {
    return { baseNumber: RYO_PANEL_NUMBER, combinedNum: RYO_PANEL_NUMBER }
  }
  if (NIJIKA_PANEL_NUMBER === baseNum || NIJIKA_PANEL_NUMBER === combinedNum) {
    return { baseNumber: PANEL_NUMBER_FOUR, combinedNum: PANEL_NUMBER_EMPTY }
  }
  if (isPanelGreaterTwo(baseNum, combinedNum)) {
    return {
      baseNumber: castNumber(baseNum + combinedNum - RYO_PANEL_NUMBER) / 2,
      combinedNum: PANEL_NUMBER_EMPTY
    }
  } else {
    return { baseNumber: baseNum, combinedNum: combinedNum }
  }
}
const isPanelGreaterTwo = (x: number, y: number) => {
  return PANEL_NUMBER_TWO < x && PANEL_NUMBER_TWO < y
}

export const handleMoveLeft = (board: number[][]): number[][] => {
  const newBoard = moveLeft(addNumberLeftside(moveLeft(board)))
  if (JSON.stringify(board) !== JSON.stringify(newBoard)) {
    return addRandomNumber(newBoard)
  } else {
    return newBoard
  }
}

export const handleMoveRight = (board: number[][]): number[][] => {
  const newBoard = moveRight(addNumberRightside(moveRight(board)))
  if (JSON.stringify(board) !== JSON.stringify(newBoard)) {
    return addRandomNumber(newBoard)
  } else {
    return newBoard
  }
}

export const handleMoveUp = (board: number[][]): number[][] => {
  const newBoard = convertColumnToRow(
    moveLeft(addNumberLeftside(moveLeft(convertColumnToRow(board))))
  )
  if (JSON.stringify(board) !== JSON.stringify(newBoard)) {
    return addRandomNumber(newBoard)
  } else {
    return newBoard
  }
}

export const handleMoveDown = (board: number[][]): number[][] => {
  const newBoard = convertColumnToRow(
    moveRight(addNumberRightside(moveRight(convertColumnToRow(board))))
  )
  if (JSON.stringify(board) !== JSON.stringify(newBoard)) {
    return addRandomNumber(newBoard)
  } else {
    return newBoard
  }
}
