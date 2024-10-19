import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'

import { Toast, ToastProps } from './Toast'

const meta = {
  title: 'BTW-Custom/Toast',
  component: Toast,
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
    // colorTheme: { control: false }
  }
} satisfies Meta<typeof Toast>

export default meta

type Story = StoryObj<typeof Toast>

const TemplateStory: Story = {
  render: (args: ToastProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(args.open)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setIsOpen(args.open)
    }, [args.open])

    return (
      <div>
        <button onClick={() => setIsOpen(true)}>Open Toast</button>
        <Toast {...args} open={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    )
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    open: false,
    message: 'TEST Message'
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
    open: false,
    colorTheme: 'dark',
    message: 'TEST Message'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export const ErrorLight: Story = {
  ...TemplateStory,
  args: {
    open: false,
    message: 'TEST error Message',
    isError: true
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
}

export const ErrorDark: Story = {
  ...TemplateStory,
  args: {
    open: false,
    colorTheme: 'dark',
    message: 'TEST error Message',
    isError: true
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
