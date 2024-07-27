import { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { ReDisplayOptionDialog, ReDisplayOptionDialogProps } from './ReDisplayOptionDialog'

const meta = {
  title: 'BTW-Custom/ReDisplayOptionDialog',
  component: ReDisplayOptionDialog,
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
    children: { table: { disable: true } },
    onConfirm: { control: false }
  }
} satisfies Meta<typeof ReDisplayOptionDialog>

export default meta

type Story = StoryObj<typeof ReDisplayOptionDialog>

const TemplateStory: Story = {
  render: (args: ReDisplayOptionDialogProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(args.open)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setIsOpen(args.open)
    }, [args.open])

    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Dialog</button>
        <ReDisplayOptionDialog {...args} open={isOpen} onConfirm={() => setIsOpen(false)}>
          <p style={{ margin: 0 }}>ここから先は外部サイトとなります。XXXに委託しています。</p>
        </ReDisplayOptionDialog>
      </>
    )
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    open: false,
    localStorageKey: 'storybookSample',
    title: '実行してもよろしいですか',
    buttonString: 'OK',
    ariaLabel: 'Confirm_OK'
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
    localStorageKey: 'storybookSample',
    title: '実行してもよろしいですか',
    colorTheme: 'dark',
    buttonString: 'OK',
    ariaLabel: 'Confirm_OK'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
