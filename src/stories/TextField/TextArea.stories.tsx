import type { Meta, StoryObj } from '@storybook/react'

import { TextArea, TextAreaProps } from './TextArea'

const meta = {
  title: 'BTW-Custom/TextArea',
  component: TextArea,
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
    className: { control: false },
    colorTheme: { control: false },
    onSetContext: { control: false }
  }
} satisfies Meta<typeof TextArea>

export default meta

type Story = StoryObj<typeof TextArea>

const TemplateStory: Story = {
  render: (args: TextAreaProps) => {
    return <TextArea {...args} />
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    placeholder: 'placeholder',
    width: '100%',
    height: '100%'
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
    placeholder: 'placeholder',
    width: '100%',
    height: '100%'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
