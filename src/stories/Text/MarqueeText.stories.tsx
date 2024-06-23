import type { Meta, StoryObj } from '@storybook/react'

import { MarqueeText, MarqueeTextProps } from './MarqueeText'

const meta = {
  title: 'BTW-Custom/MarqueeText',
  component: MarqueeText,
  parameters: {
    layout: 'centered',
    backgrounds: {
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#333333' }
      ]
    }
  },
  args: {},
  argTypes: {
    // colorTheme: { control: false},
  }
} satisfies Meta<typeof MarqueeText>

export default meta

type Story = StoryObj<typeof MarqueeText>

const TemplateStory: Story = {
  render: (args: MarqueeTextProps) => {
    return <MarqueeText {...args} />
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    text: 'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.'
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
    text: 'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
