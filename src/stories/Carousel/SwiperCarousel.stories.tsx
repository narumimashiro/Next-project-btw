import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { SwiperCarousel, SwiperCarouselProps } from './SwiperCarousel'

const meta = {
  title: 'BTW-Custom/SwiperCarousel',
  component: SwiperCarousel,
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
    colorTheme: { control: false },
    className: { control: false }
  }
} satisfies Meta<typeof SwiperCarousel>

export default meta
type Story = StoryObj<typeof SwiperCarousel>

const TemplateStory: Story = {
  render: (args: SwiperCarouselProps) => {
    return (
      <SwiperCarousel {...args}>
        <div style={{ width: '100%', height: 250, backgroundColor: 'red' }}>Sample 1</div>
        <div style={{ width: '100%', height: 250, backgroundColor: 'blue' }}>Sample 2</div>
        <div style={{ width: '100%', height: 250, backgroundColor: 'yellow' }}>Sample 3</div>
        <div style={{ width: '100%', height: 250, backgroundColor: 'green' }}>Sample 5</div>
        <div style={{ width: '100%', height: 250, backgroundColor: 'orange' }}>Sample 6</div>
        <div style={{ width: '100%', height: 250, backgroundColor: 'cyan' }}>Sample 7</div>
        <div style={{ width: '100%', height: 250, backgroundColor: 'pink' }}>Sample 8</div>
      </SwiperCarousel>
    )
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    autoplay: true,
    pagenation: false,
    infinite: true
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
    autoplay: true,
    pagenation: false,
    infinite: true
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export const PageNationLight: Story = {
  ...TemplateStory,
  args: {
    autoplay: false,
    pagenation: true,
    infinite: true
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
}

export const PageNationDark: Story = {
  ...TemplateStory,
  args: {
    colorTheme: 'dark',
    autoplay: false,
    pagenation: true,
    infinite: true
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export const SingleLight: Story = {
  ...TemplateStory,
  args: {
    autoplay: true,
    pagenation: false,
    infinite: true,
    size: 'single'
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
}

export const SingleDark: Story = {
  ...TemplateStory,
  args: {
    colorTheme: 'dark',
    autoplay: true,
    pagenation: false,
    infinite: true,
    size: 'single'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
