import type { Meta, StoryObj } from '@storybook/react'

import { Drawer, DrawerProps } from './Drawer'
import { useEffect, useState } from 'react'

const meta = {
  title: 'BTW-Custom/Drawer',
  component: Drawer,
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
    // colorTheme: { control: false }
  }
} satisfies Meta<typeof Drawer>

export default meta

type Story = StoryObj<typeof Drawer>

const TemplateStory: Story = {
  render: (args: DrawerProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(args.open)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setIsOpen(args.open)
    }, [args.open])

    return (
      <div>
        <button onClick={() => setIsOpen(true)}>Open Drawer</button>
        <Drawer {...args} open={isOpen} onClose={() => setIsOpen(false)}>
          <span>Test</span>
        </Drawer>
      </div>
    )
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    open: false
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
    colorTheme: 'dark'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
