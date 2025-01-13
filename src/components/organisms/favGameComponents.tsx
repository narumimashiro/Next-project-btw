import { useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import styles from '@/styles/organisms/FavGameComponents.module.scss'

import { useCustomContext } from '@/components/customProvider'

import type { CarouselSize } from '@/stories/Carousel/SwiperCarousel'
import { SwiperCarousel } from '@/stories/Carousel/SwiperCarousel'
import { OutlineText } from '@/stories/Text/OutlineText'

const WUTHERIN_WAVES = 'wuthering_waves'
const PROJECTSEKAI = 'project_sekai'
const ARKNIGHTS = 'arknights'
const ENDFIELD = 'endfield'
const GENSHIN = 'genshin'
const STARRAIL = 'starrail'

type GameInfo = {
  gameTitle: string
  thumbnailSrc: string
}

export const myFavGameInfoList: Record<string, GameInfo> = {
  [WUTHERIN_WAVES]: {
    gameTitle: 'Wuthering Waves',
    thumbnailSrc: '/images/myfavgame/wutheringwaves.png'
  },
  [PROJECTSEKAI]: {
    gameTitle: 'Project Sekai',
    thumbnailSrc: '/images/myfavgame/projectsekai.png'
  },
  [ARKNIGHTS]: {
    gameTitle: 'Arknights',
    thumbnailSrc: '/images/myfavgame/arknights.png'
  },
  [ENDFIELD]: {
    gameTitle: 'endfield',
    thumbnailSrc: '/images/myfavgame/endfield.png'
  },
  [GENSHIN]: {
    gameTitle: 'Genshin Impact',
    thumbnailSrc: '/images/myfavgame/genshin.png'
  },
  [STARRAIL]: {
    gameTitle: 'Honkai: Star Rail',
    thumbnailSrc: '/images/myfavgame/starrail.png'
  }
}

const LinkIframe = ({ link, title }: { link: string; title: string }) => {
  return (
    <a className={styles.linkImage} href={link} target="_blank" rel="noopener noreferrer">
      <iframe src={link} title={title} className={styles.iframeDisabled} />
    </a>
  )
}

const LinkImage = ({ link, imgSrc }: { link: string; imgSrc: string }) => {
  return (
    <a className={styles.linkImage} href={link} target="_blank" rel="noopener noreferrer">
      <img src={imgSrc} alt="" />
    </a>
  )
}

export const MyFavGameLinks = ({ size }: { size: CarouselSize }) => {
  const { isPortrait } = useCustomContext()
  return (
    <SwiperCarousel
      autoplay={true}
      size={size}
      className={`${isPortrait ? styles.myfavCarousel_portrait : styles.myfavCarousel_landscape}`}>
      <LinkImage
        key="prsk"
        link="https://pjsekai.sega.jp/"
        imgSrc="/images/myfavgame/projectsekai.png"
      />
      <LinkIframe
        key="endfield"
        title="endfield"
        link="https://endfield.gryphline.com/ja-jp#home"
      />
      <LinkImage
        key="arknights"
        link="https://www.arknights.jp/"
        imgSrc="/images/myfavgame/arknights.png"
      />
      <LinkImage
        key="wutheringwaves"
        link="https://wutheringwaves.kurogames.com/jp/main/#main"
        imgSrc="/images/myfavgame/wutheringwaves.png"
      />
      <LinkImage
        key="genshin"
        link="https://genshin.hoyoverse.com/ja"
        imgSrc="/images/myfavgame/genshin.png"
      />
      <LinkImage
        key="starrail"
        link="https://hsr.hoyoverse.com/ja-jp/home"
        imgSrc="/images/myfavgame/starrail.png"
      />
      ,
      <LinkImage
        key="valorant"
        link="https://playvalorant.com/ja-jp/"
        imgSrc="/images/myfavgame/valorant.png"
      />
      <LinkImage
        key="bangdream"
        link="https://bang-dream.bushimo.jp/"
        imgSrc="/images/myfavgame/bangdream.png"
      />
    </SwiperCarousel>
  )
}

export const CatchcopyContext = ({ isPortrait }: { isPortrait: boolean }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const colorTheme = theme.palette.mode

  return (
    <div className={`${styles.catchcopy} ${styles[colorTheme]}`}>
      <OutlineText
        className={`${styles.title} ${isPortrait ? styles.portrait : ''}`}
        text={t('TEMP_My Fav.GAME')}
      />
      <OutlineText
        className={`${styles.subtitle} ${isPortrait ? styles.portrait : ''}`}
        text={t("TEMP_I'll introduce the Game I'm playing!")}
      />
      <OutlineText
        className={`${styles.subtitle} ${isPortrait ? styles.portrait : ''}`}
        text={t('TEMP_Great hobby that connects people!')}
      />
    </div>
  )
}

export const ThumbnailList = () => {
  return <></>
}
