import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { ReDisplayOptionDialog, ReDisplayOptionDialogProps } from './ReDisplayOptionDialog'

const meta = {
  title: 'BTW-Custom/Dialog/ReDisplayOptionDialog',
  component: ReDisplayOptionDialog,
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
  },
  argTypes: {
    // summaryStyle: { control: false},
    // detailStyle: { control: false},
    // colorTheme: { control: false},
    // detailComponent: { control: false},
  },
} satisfies Meta<typeof ReDisplayOptionDialog>

export default meta

type Story = StoryObj<typeof ReDisplayOptionDialog>

const TemplateStory: Story = {
  render: (args: ReDisplayOptionDialogProps) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false)
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Dialog</button>
        <ReDisplayOptionDialog {...args} open={isOpen} onConform={() => setIsOpen(false)}>
          <p style={{margin: 0}}>ここから先は外部サイトとなります。XXXに委託しています。</p>
        </ReDisplayOptionDialog>
      </>
    )
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    localStorageKey: 'storybookSample',
    title: '実行してもよろしいですか',
  },
  parameters: {
    backgrounds: {
      default: 'light'
    },
  },
}

export const Dark: Story = {
  ...TemplateStory,
  args: {
    localStorageKey: 'storybookSample',
    title: '実行してもよろしいですか',
    colorTheme: 'dark',
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    },
  },
}