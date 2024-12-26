import React from 'react'

import { Carousel } from './Carousel'

import type { CarouselProps } from './Carousel'
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
  <iframe key="prsk" title="prsk" src="https://pjsekai.sega.jp/" />,
  <iframe key="mygo" title="mygo" src="https://bang-dream.com/mygo" />,
  <iframe
    key="wutheringwaves"
    title="wutheringwaves"
    src="https://wutheringwaves.kurogames.com/en/?gad_source=1&gclid=CjwKCAjwtNi0BhA1EiwAWZaANBMVh0zzUDVZ5i669InT9Kx_H9Mi25ltO79AGIJv4aresPtqdPvU3RoC5NYQAvD_BwE"
  />,
  <iframe key="genshin" title="genshin" src="https://genshin.hoyoverse.com/ja" />,
  <iframe key="arknights" title="arknights" src="https://www.arknights.jp/" />,
  <iframe key="hsr" title="hsr" src="https://hsr.hoyoverse.com/ja-jp/home" />,
  <iframe key="endfield" title="endfield" src="https://endfield.gryphline.com/ja-jp#home" />
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
