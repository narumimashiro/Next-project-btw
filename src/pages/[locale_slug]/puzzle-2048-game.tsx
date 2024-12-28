import type { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { useTranslation } from 'next-i18next'

import Meta from '@/components/meta'
import { Puzzle2048Board } from '@/components/organisms/puzzle2048Components'
import {
  addRandomNumber,
  handleMoveDown,
  handleMoveLeft,
  handleMoveRight,
  handleMoveUp
} from '@/lib/puzzle2048Methods'
import { isVisibleMenuState } from '@/recoil/manageMenu'

export const getStaticPaths: GetStaticPaths = async () => {
  const { language }: { language: string[] } = require('@/locales/config')
  const paths = language.map((locale) => ({
    params: { locale_slug: locale }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { locale_slug } = params!

  return {
    props: {
      locale: locale_slug
    }
  }
}

const Puzzle2048Game = () => {
  const { t } = useTranslation()

  const setVisibleMenu = useSetRecoilState(isVisibleMenuState)

  useEffect(() => {
    setVisibleMenu(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initBoard = () => {
    return addRandomNumber(addRandomNumber(Array.from({ length: 4 }, () => Array(4).fill(0))))
  }

  const [board2048, setBoard2048] = useState<number[][]>(() => initBoard())

  const onClickRight = () => {
    const newBoard = handleMoveRight(board2048)
    if (JSON.stringify(board2048) !== JSON.stringify(newBoard)) {
      setBoard2048([...newBoard])
    }
  }

  const onClickLeft = () => {
    const newBoard = handleMoveLeft(board2048)
    if (JSON.stringify(board2048) !== JSON.stringify(newBoard)) {
      setBoard2048([...newBoard])
    }
  }

  const onClickUp = () => {
    const newBoard = handleMoveUp(board2048)
    if (JSON.stringify(board2048) !== JSON.stringify(newBoard)) {
      setBoard2048([...newBoard])
    }
  }

  const onClickDown = () => {
    const newBoard = handleMoveDown(board2048)
    if (JSON.stringify(board2048) !== JSON.stringify(newBoard)) {
      setBoard2048([...newBoard])
    }
  }

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', t('TEMP_Development'))} />
      <div style={{ height: 100 }} />
      <Puzzle2048Board board={board2048} updateBoard={setBoard2048} />
      <div style={{ height: 100 }} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          gap: '32px',
          alignContent: 'center',
          width: 'fit-content'
        }}>
        <button style={{ width: 50, height: 40, margin: 'auto' }} onClick={onClickUp}>
          ↑
        </button>
        <div style={{ display: 'flex', gap: '32px' }}>
          <button style={{ width: 50, height: 40 }} onClick={onClickLeft}>
            ←
          </button>
          <button style={{ width: 50, height: 40 }} onClick={onClickDown}>
            ↓
          </button>
          <button style={{ width: 50, height: 40 }} onClick={onClickRight}>
            →
          </button>
        </div>
        <button style={{ marginTop: 50 }} onClick={() => setBoard2048(initBoard)}>
          Reset
        </button>
      </div>
    </>
  )
}
export default Puzzle2048Game
