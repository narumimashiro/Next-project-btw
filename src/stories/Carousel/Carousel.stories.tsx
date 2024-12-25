import React from 'react'

import { Carousel, CarouselProps } from './Carousel'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'BTW-Custom/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
    backgrounds: {
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#121212' }
      ]
    }
  },
  args: {},
  argTypes: {
    colorTheme: { control: false }
  }
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof Carousel>

const sampleItemList = [
  <iframe key="prsk" src="https://pjsekai.sega.jp/" />,
  <iframe key="mygo" src="https://bang-dream.com/mygo" />,
  <iframe
    key="wutheringwaves"
    src="https://wutheringwaves.kurogames.com/en/?gad_source=1&gclid=CjwKCAjwtNi0BhA1EiwAWZaANBMVh0zzUDVZ5i669InT9Kx_H9Mi25ltO79AGIJv4aresPtqdPvU3RoC5NYQAvD_BwE"
  />,
  <iframe key="genshin" src="https://genshin.hoyoverse.com/ja" />,
  <iframe key="arknights" src="https://www.arknights.jp/" />,
  <iframe key="hsr" src="https://hsr.hoyoverse.com/ja-jp/home" />,
  <iframe key="endfield" src="https://endfield.gryphline.com/ja-jp#home" />
]

const TemplateStory: Story = {
  render: (args: CarouselProps) => {
    return <Carousel {...args} />
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    itemList: sampleItemList,
    itemWidth: '100%',
    itemHeight: 200,
    decorateFeedInOut: false
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
}

export const Dark: Story = {
  ...TemplateStory,
  args: {
    colorTheme: 'dark',
    itemList: sampleItemList,
    itemWidth: '100%',
    itemHeight: 200,
    decorateFeedInOut: true
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
