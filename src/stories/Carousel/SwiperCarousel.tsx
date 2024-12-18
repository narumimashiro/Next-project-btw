import { useTheme } from '@mui/material'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { SwiperModule } from 'swiper/types'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import React from 'react'
import styles from './SwiperCarousel.module.scss'

export type CarouselSize = 'wide' | 'normal' | 'single'

export type SwiperCarouselProps = {
  children: React.ReactNode
  className?: string
  colorTheme?: 'light' | 'dark'
  autoplay?: boolean
  pagenation?: boolean
  infinite?: boolean
  size?: CarouselSize
}

export const SwiperCarousel = ({
  children,
  className = '',
  colorTheme,
  autoplay = true,
  pagenation = false,
  infinite = true,
  size = 'normal'
}: SwiperCarouselProps) => {
  const theme = useTheme()
  const color = colorTheme ? colorTheme : theme.palette.mode

  const swiperModules = [
    pagenation ? Pagination : undefined,
    autoplay ? Autoplay : undefined
  ].filter(Boolean) as SwiperModule[]

  const renderChildrenWithSwiperSlide = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return <SwiperSlide>{child}</SwiperSlide>
    }
    return child
  })

  return (
    <Swiper
      className={`${styles[`BTW_swiper_carousel_${color}`]} ${className}`}
      modules={swiperModules}
      spaceBetween={24}
      slidesPerView={size === 'single' ? 1 : size === 'wide' ? 4 : 2}
      centeredSlides={true}
      loop={infinite}
      speed={1500}
      autoplay={
        autoplay
          ? {
              delay: 5000,
              pauseOnMouseEnter: true,
              disableOnInteraction: false
            }
          : undefined
      }
      pagination={
        pagenation
          ? {
              clickable: true,
              renderBullet: (_, className) => `<span class="${className}"></span>`
            }
          : undefined
      }>
      {renderChildrenWithSwiperSlide}
    </Swiper>
  )
}
