import type { Meta, StoryObj } from '@storybook/react'

import { Slider, SliderProps } from './Slider'

const meta = {
  title: 'BTW-Custom/Slider',
  component: Slider,
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
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof Slider>

const TemplateStory: Story = {
  render: (args: SliderProps) => {
    return <Slider {...args} />
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    min: 0,
    max: 39,
    step: 1,
    defaultValue: 25,
    dispValue: false,
    ariaLable: ''
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
    min: 0,
    max: 39,
    step: 1,
    defaultValue: 25,
    dispValue: false,
    ariaLable: ''
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
