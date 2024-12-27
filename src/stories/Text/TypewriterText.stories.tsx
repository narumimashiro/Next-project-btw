import { TypewriterText } from './TypewriterText'

import type { TypewriterTextProps } from './TypewriterText'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'BTW-Custom/TypewriterText',
  component: TypewriterText,
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
  argTypes: {}
} satisfies Meta<typeof TypewriterText>

export default meta

type Story = StoryObj<typeof TypewriterText>

const TemplateStory: Story = {
  render: (args: TypewriterTextProps) => {
    return <TypewriterText {...args} />
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    text: '2024年07月27日,28日に開催された6th LIVE「見つけた景色、たずさえて」で初披露された5thSingleの表題楽曲である「端程山」の読み方は？',
    speedSeconds: 0.1
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
    text: '燈の心の叫び、語りから始まる楽曲はいくつかありますが、「春日影」、「詩超絆」、「音一会」のうち該当しないのはどれ？',
    speedSeconds: 0.1
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
