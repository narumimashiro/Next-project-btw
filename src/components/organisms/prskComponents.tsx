import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { Grid, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import styles from '@/styles/organisms/PrskComponents.module.scss'

import { BodyText } from '@/components/atom/componentsTemplate'
import { useCustomContext } from '@/components/customProvider'
import { MusicPlayer } from '@/components/molecules/musicplayer'
import { CurrentSongsInfoState } from '@/recoil/services/getProjectSekaiSongs'
import type { ProjectSekaiSongsInfo } from '@/recoil/services/getProjectSekaiSongs'

import { ListItem } from '@/stories/List/ListItem'
import { Slider } from '@/stories/Slider/Slider'

const ALL = 'All'
const VIRTUALSINGER = 'VirtualSinger'
const LEONEED = 'Leoneed'
const MOREMOREJUMP = 'MoreMoreJump'
const VIVIDBADSQUAD = 'VividBadSquad'
const WONDERLANDSSHOWTIME = 'WonderlandsShowtime'
const NIGHTCODEAT25 = 'NightcodeAt25'

type PrskMusicListProps = {
  musicList: ProjectSekaiSongsInfo[]
  onOpenSmartphone: () => void
}

export const PrskMusicList = ({ musicList, onOpenSmartphone }: PrskMusicListProps) => {
  const [selectedUnit, setSelectedUnit] = useState(ALL)
  const [currentMusicList, setCurrentMusicList] = useRecoilState(CurrentSongsInfoState)
  useEffect(() => {
    // initilize
    selectUnitAndSortMusic(ALL)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectUnitAndSortMusic = (unit: string) => {
    setSelectedUnit(unit)

    if (ALL === unit) {
      setCurrentMusicList(() => {
        return {
          currenSongIndex: 0,
          currentList: musicList
        }
      })
    } else {
      const currentList = musicList.filter((music) => music.id === unit)
      setCurrentMusicList(() => {
        return {
          currenSongIndex: 0,
          currentList: currentList
        }
      })
    }
  }

  return (
    <Grid container>
      <Grid item xs={3}>
        <UnitSortMenu onSelectUnit={selectUnitAndSortMusic} currentSelectUnit={selectedUnit} />
      </Grid>
      <Grid item xs={9}>
        <SongList
          musicList={currentMusicList.currentList}
          onOpenSmartphone={onOpenSmartphone}
        />
      </Grid>
    </Grid>
  )
}

type UnitSortMenuProps = {
  onSelectUnit: (unit: string) => void
  currentSelectUnit: string
}

const UnitSortMenu = ({ onSelectUnit, currentSelectUnit }: UnitSortMenuProps) => {
  const { isPortrait } = useCustomContext()

  return (
    <div className={`${styles.unitSortMenu} ${isPortrait && styles.portrait} invisible-scroll`}>
      <AllIconButton currentSelectUnit={currentSelectUnit} onSelectUnit={onSelectUnit} />
      <VirtualSingerIconButton
        currentSelectUnit={currentSelectUnit}
        onSelectUnit={onSelectUnit}
      />
      <LeoneedIconButton currentSelectUnit={currentSelectUnit} onSelectUnit={onSelectUnit} />
      <MoreMoreJumpIconButton
        currentSelectUnit={currentSelectUnit}
        onSelectUnit={onSelectUnit}
      />
      <VividBadSquadIconButton
        currentSelectUnit={currentSelectUnit}
        onSelectUnit={onSelectUnit}
      />
      <WonderlandsShowtimeIconButton
        currentSelectUnit={currentSelectUnit}
        onSelectUnit={onSelectUnit}
      />
      <NightcodeAt25IconButton
        currentSelectUnit={currentSelectUnit}
        onSelectUnit={onSelectUnit}
      />
    </div>
  )
}

type EachUnitButton = Pick<UnitSortMenuProps, 'onSelectUnit' | 'currentSelectUnit'>

const AllIconButton = ({ onSelectUnit, currentSelectUnit }: EachUnitButton) => {
  const selected = ALL === currentSelectUnit

  return (
    <button
      className={`${styles.unitButton} ${selected ? styles.selected : ''}`}
      onClick={() => onSelectUnit(ALL)}>
      <p className="font-bold">ALL</p>
    </button>
  )
}

const VirtualSingerIconButton = ({ onSelectUnit, currentSelectUnit }: EachUnitButton) => {
  const selected = VIRTUALSINGER === currentSelectUnit

  return (
    <button
      className={`${styles.unitButton} ${selected ? styles.selected : ''}`}
      onClick={() => onSelectUnit(VIRTUALSINGER)}>
      <Image
        width={80}
        height={60}
        src="/images/logo_virtual.png"
        alt="virtual singer button"
      />
    </button>
  )
}

const LeoneedIconButton = ({ onSelectUnit, currentSelectUnit }: EachUnitButton) => {
  const selected = LEONEED === currentSelectUnit

  return (
    <button
      className={`${styles.unitButton} ${selected ? styles.selected : ''}`}
      onClick={() => onSelectUnit(LEONEED)}>
      <Image width={80} height={60} src="/images/logo_leoneed.png" alt="leoneed button" />
    </button>
  )
}

const MoreMoreJumpIconButton = ({ onSelectUnit, currentSelectUnit }: EachUnitButton) => {
  const selected = MOREMOREJUMP === currentSelectUnit

  return (
    <button
      className={`${styles.unitButton} ${selected ? styles.selected : ''}`}
      onClick={() => onSelectUnit(MOREMOREJUMP)}>
      <Image
        width={80}
        height={60}
        src="/images/logo_moremore.png"
        alt="more more jump button"
      />
    </button>
  )
}

const VividBadSquadIconButton = ({ onSelectUnit, currentSelectUnit }: EachUnitButton) => {
  const selected = VIVIDBADSQUAD === currentSelectUnit

  return (
    <button
      className={`${styles.unitButton} ${selected ? styles.selected : ''}`}
      onClick={() => onSelectUnit(VIVIDBADSQUAD)}>
      <Image width={80} height={60} src="/images/logo_vivid.png" alt="vivid bad squad button" />
    </button>
  )
}

const WonderlandsShowtimeIconButton = ({ onSelectUnit, currentSelectUnit }: EachUnitButton) => {
  const selected = WONDERLANDSSHOWTIME === currentSelectUnit

  return (
    <button
      className={`${styles.unitButton} ${selected ? styles.selected : ''}`}
      onClick={() => onSelectUnit(WONDERLANDSSHOWTIME)}>
      <Image
        width={80}
        height={60}
        src="/images/logo_wonderlands.png"
        alt="wonderlands showtime button"
      />
    </button>
  )
}

const NightcodeAt25IconButton = ({ onSelectUnit, currentSelectUnit }: EachUnitButton) => {
  const selected = NIGHTCODEAT25 === currentSelectUnit

  return (
    <button
      className={`${styles.unitButton} ${selected ? styles.selected : ''}`}
      onClick={() => onSelectUnit(NIGHTCODEAT25)}>
      <Image
        width={80}
        height={60}
        src="/images/logo_nightcode.png"
        alt="nightcode at 25 button"
      />
    </button>
  )
}

type SongListProps = Pick<PrskMusicListProps, 'musicList' | 'onOpenSmartphone'>
const SongList = ({ musicList, onOpenSmartphone }: SongListProps) => {
  const { isPortrait } = useCustomContext()
  const setSelectSong = useSetRecoilState(CurrentSongsInfoState)

  const onClickPlay = (index: number) => {
    setSelectSong((pre) => {
      return {
        currenSongIndex: index,
        currentList: pre.currentList
      }
    })
    if (isPortrait) onOpenSmartphone()
  }

  return (
    <div
      className={`invisible-scroll ${styles.songList} ${isPortrait ? styles.portrait : styles.landscape}`}>
      {musicList.map((el, index) => (
        <MusicCard key={el.song_title} musicInfo={el} onClick={() => onClickPlay(index)} />
      ))}
    </div>
  )
}

type MusicCardProps = {
  musicInfo: ProjectSekaiSongsInfo
  onClick: () => void
}

const MusicCard = ({ musicInfo, onClick }: MusicCardProps) => {
  const theme = useTheme()
  const colorTheme = theme.palette.mode

  const unitName = useMemo(() => {
    if (musicInfo.unit_name.feat) {
      return `${musicInfo.unit_name.unit}×${musicInfo.unit_name.feat}`
    } else {
      return `${musicInfo.unit_name.unit}`
    }
  }, [musicInfo])

  return (
    <ListItem colorTheme={colorTheme} onClick={onClick}>
      <div className={styles.musicCard}>
        <BodyText className={styles.title}>{musicInfo.song_title}</BodyText>
        <p className={styles.detailInfo}>{unitName}</p>
        <p className={styles.detailInfo}>{musicInfo.artist_name}</p>
      </div>
    </ListItem>
  )
}

export const ProjectSekaiFooter = () => {
  return (
    <div className={styles.prskFooter}>
      <div className={styles.linkWrap}>
        <a
          href="https://piapro.jp/license/pcl/summary"
          target="_blank"
          rel="noopener noreferrer">
          <img src="/images/logo_piapro.png" alt="" />
        </a>
        <a href="https://pjsekai.sega.jp/" target="_blank" rel="noopener noreferrer">
          <img src="/images/logo_prsk.png" alt="" />
        </a>
        <a href="https://www.crypton.co.jp/" target="_blank" rel="noopener noreferrer">
          <img src="/images/logo_crypton.png" alt="" />
        </a>
      </div>
    </div>
  )
}

type PrscMusicPlayerProps = {
  onSetSelectYoutubeSrc: (src: string) => void
  onPlayMusic: () => void
}
export const PrskMusicPlayer = ({
  onSetSelectYoutubeSrc,
  onPlayMusic
}: PrscMusicPlayerProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const colorTheme = theme.palette.mode

  const [currentSelectedSongsInfo, setCurrentSelectedSongsInfo] =
    useRecoilState(CurrentSongsInfoState)
  const prskMusicInfo = useMemo(
    () => currentSelectedSongsInfo.currentList[currentSelectedSongsInfo.currenSongIndex],
    [currentSelectedSongsInfo]
  )
  const musicTitle = useMemo(() => prskMusicInfo?.song_title || '', [prskMusicInfo])
  const unitName = useMemo(() => {
    if (prskMusicInfo?.unit_name.feat) {
      return `${prskMusicInfo?.unit_name.unit}×${prskMusicInfo?.unit_name.feat}`
    } else {
      return `${prskMusicInfo?.unit_name.unit}`
    }
  }, [prskMusicInfo])
  const vocalPName = useMemo(() => prskMusicInfo?.artist_name || '', [prskMusicInfo])

  const selectTypeSliderInfo = useMemo(() => {
    const resLabelList: { label: string; ytSrc: string }[] = []
    if (prskMusicInfo?.youtube_src.original !== '') {
      resLabelList.push({
        label: t('STRID_prsk_slider_label_original'),
        ytSrc: prskMusicInfo?.youtube_src.original
      })
    }
    if (prskMusicInfo?.youtube_src.sekai_3d !== '') {
      resLabelList.push({
        label: t('STRID_prsk_slider_label_3d'),
        ytSrc: prskMusicInfo?.youtube_src.sekai_3d
      })
    }
    if (prskMusicInfo?.youtube_src.sekai_2d !== '') {
      resLabelList.push({
        label: t('STRID_prsk_slider_label_2d'),
        ytSrc: prskMusicInfo?.youtube_src.sekai_2d
      })
    }
    return resLabelList
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prskMusicInfo])

  const MAX_SLIDER = 100,
    MIN_SLIDER = 0
  const [mvSelectSlider, setMvSelectSlider] = useState(50)
  const [viewMvLink, setViewMvLink] = useState('')
  useEffect(() => {
    if (!prskMusicInfo) return

    if (mvSelectSlider <= MAX_SLIDER / selectTypeSliderInfo.length) {
      setViewMvLink(selectTypeSliderInfo[0].ytSrc)
    } else if (mvSelectSlider > MAX_SLIDER - MAX_SLIDER / selectTypeSliderInfo.length) {
      setViewMvLink(selectTypeSliderInfo[selectTypeSliderInfo.length - 1].ytSrc)
    } else {
      if (3 == selectTypeSliderInfo.length) {
        setViewMvLink(selectTypeSliderInfo[1].ytSrc)
      }
    }
  }, [mvSelectSlider, prskMusicInfo, selectTypeSliderInfo, viewMvLink])

  const handlePlaySong = () => {
    onSetSelectYoutubeSrc(viewMvLink)
    onPlayMusic()
  }

  const handleNextSong = () => {
    setCurrentSelectedSongsInfo((pre) => {
      const nextIdx =
        pre.currenSongIndex + 1 < pre.currentList.length ? pre.currenSongIndex + 1 : 0
      return {
        currenSongIndex: nextIdx,
        currentList: pre.currentList
      }
    })
  }

  const handlePrevSong = () => {
    setCurrentSelectedSongsInfo((pre) => {
      const prevIdx =
        pre.currenSongIndex - 1 < 0 ? pre.currentList.length - 1 : pre.currenSongIndex - 1
      return {
        currenSongIndex: prevIdx,
        currentList: pre.currentList
      }
    })
  }

  return (
    <MusicPlayer
      autoPlay={true}
      noControl={true}
      srcId={viewMvLink}
      musicTitle={musicTitle}
      unitName={unitName}
      vocalP={vocalPName}
      onClickPlay={handlePlaySong}
      onClickNext={handleNextSong}
      onClickPrev={handlePrevSong}>
      <div className={styles['select-mv-container']}>
        <Grid container className={styles['mv-label']}>
          {selectTypeSliderInfo.map((el) => (
            <Grid
              item
              key={el.label}
              xs={12 / selectTypeSliderInfo.length}
              className={styles['mv-label-item']}>
              {el.label}
            </Grid>
          ))}
        </Grid>
        <Slider
          colorTheme={colorTheme}
          min={MIN_SLIDER}
          max={MAX_SLIDER}
          onChange={setMvSelectSlider}
        />
      </div>
    </MusicPlayer>
  )
}
