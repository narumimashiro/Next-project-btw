import type { Meta, StoryObj } from '@storybook/react'

import { BasicButton, BasicButtonProps } from './BasicButton'

const meta = {
  title: 'BTW-Custom/Button/BasicButton',
  component: BasicButton,
  parameters: {
    layout: 'centered',
    backgrounds: {
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#333333' }
      ]
    }
  },
  args: {
    children: 'Button',
    disabled: false,
    className: ''
  },
  argTypes: {
    colorTheme: { control: false },
    className: { control: false }
  }
} satisfies Meta<typeof BasicButton>

export default meta

type Story = StoryObj<typeof BasicButton>

const TemplateStory: Story = {
  render: (args: BasicButtonProps) => {
    return <BasicButton {...args}>{args.children}</BasicButton>
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    colorTheme: 'light'
  }
}

export const Dark: Story = {
  ...TemplateStory,
  args: {
    colorTheme: 'dark'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export const LightDisabled: Story = {
  ...TemplateStory,
  args: {
    colorTheme: 'light',
    disabled: true
  }
}

export const DarkDisabled: Story = {
  ...TemplateStory,
  args: {
    colorTheme: 'dark',
    disabled: true
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
