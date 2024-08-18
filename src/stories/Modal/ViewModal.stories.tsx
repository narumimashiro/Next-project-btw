import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'

import { ViewModal, ViewModalProps } from './ViewModal'

const meta = {
  title: 'BTW-Custom/ViewModal',
  component: ViewModal,
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
} satisfies Meta<typeof ViewModal>

export default meta

type Story = StoryObj<typeof ViewModal>

const TemplateStory: Story = {
  render: (args: ViewModalProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(args.open)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setIsOpen(args.open)
    }, [args.open])

    return (
      <div>
        <button onClick={() => setIsOpen(true)}>Open ViewModal</button>
        <ViewModal {...args} open={isOpen} onClose={() => setIsOpen(false)}>
          <p>Test</p>
        </ViewModal>
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
