import { useEffect, useState } from 'react'

import Battery4BarIcon from '@mui/icons-material/Battery4Bar'
import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20'
import BatteryFullIcon from '@mui/icons-material/BatteryFull'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import { Box, IconButton } from '@mui/material'

import styles from '@/styles/molecules/MusicPlayer.module.scss'

import type { YoutubeViewerProps } from '@/components/atom/youtubeViewer'
import { YoutubeViewer } from '@/components/atom/youtubeViewer'
import { useCurrentTime } from '@/hooks/useCurrentTime'

type MusicPlayerProps = {
  children: React.ReactNode
  musicTitle: string
  unitName: string
  vocalP: string
  onClickPlay: () => void
  onClickNext?: () => void
  onClickPrev?: () => void
} & YoutubeViewerProps
export const MusicPlayer = ({
  children,
  musicTitle,
  unitName,
  vocalP,
  onClickPlay,
  onClickNext,
  onClickPrev,
  ...YouTubeProps
}: MusicPlayerProps) => {
  return (
    <div className={styles.musicplayer}>
      <TopInfo />
      <YoutubeViewer
        className={styles.movieScreen}
        height={'30%'}
        width={'80%'}
        autoPlay={YouTubeProps.autoPlay}
        srcId={YouTubeProps.srcId}
        mute={YouTubeProps.mute}
        noControl={YouTubeProps.noControl}
      />
      <div className={styles['music-info']}>
        <p className={styles.musicTitle}>{musicTitle}</p>
        <p>{unitName}</p>
        <p>{vocalP}</p>
      </div>
      {children}
      <Box className={styles.playbuttons}>
        <IconButton aria-label="previous">
          <SkipPreviousIcon sx={{ fontSize: 36 }} onClick={onClickPrev} />
        </IconButton>
        <IconButton aria-label="play/pause" onClick={onClickPlay}>
          <PlayArrowIcon sx={{ fontSize: 48 }} />
        </IconButton>
        <IconButton aria-label="next">
          <SkipNextIcon sx={{ fontSize: 36 }} onClick={onClickNext} />
        </IconButton>
      </Box>
    </div>
  )
}

const TopInfo = () => {
  const currentTime = useCurrentTime()

  const BATTERY_FULL = 'full'
  const BATTERY_HALF = 'half'
  const BATTERY_LOW = 'low'
  const [batteryType, SetBatteryType] = useState(BATTERY_FULL)
  useEffect(() => {
    const currentHour = Number(currentTime.slice(0, 2))
    if (4 <= currentHour && 13 > currentHour) {
      SetBatteryType(BATTERY_FULL)
    } else if (13 <= currentHour && 22 > currentHour) {
      SetBatteryType(BATTERY_HALF)
    } else {
      SetBatteryType(BATTERY_LOW)
    }
  }, [currentTime])

  return (
    <div className={styles.topInfo}>
      <div className={styles.iconGroup}>
        <SignalCellularAltIcon />
        {batteryType === BATTERY_FULL ? (
          <BatteryFullIcon className={styles.batteryIcon} />
        ) : batteryType === BATTERY_HALF ? (
          <Battery4BarIcon className={styles.batteryIcon} />
        ) : (
          <BatteryCharging20Icon className={styles.batteryIcon} />
        )}
      </div>
      <div className="text-xl-bold">{currentTime}</div>
    </div>
  )
}
