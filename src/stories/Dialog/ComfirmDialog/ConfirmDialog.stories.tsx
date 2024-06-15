import type { Meta, StoryObj } from '@storybook/react'
import React, { useState, useEffect } from 'react'

import { ConfirmDialog } from './ConfirmDialog'

const meta = {
  title: 'BTW-Custom/Dialog/ConfirmDialog',
  component: ConfirmDialog,
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
    open: true,
    children: <></>
  },
  argTypes: {
    colorTheme: { control: false },
    children: { table: { disable: true } },
    onConfirm: { control: false }
  }
} satisfies Meta<typeof ConfirmDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(args.open)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setIsOpen(args.open)
    }, [args.open])

    return (
      <div>
        <button onClick={() => setIsOpen(true)}>Open Dialog</button>
        <ConfirmDialog
          open={isOpen}
          title={args.title}
          colorTheme="light"
          buttonString={args.buttonString}
          onConfirm={() => setIsOpen(false)}>
          <span>This is a dialog</span>
          <span>Click the button below to close.</span>
        </ConfirmDialog>
      </div>
    )
  },
  args: {
    open: false,
    colorTheme: 'light',
    title: 'Confirm Dialog',
    buttonString: 'OK',
    ariaLabel: 'Confirm OK'
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
}

export const Dark: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div>
        <button onClick={() => setIsOpen(true)}>Open Dialog</button>
        <ConfirmDialog
          open={isOpen}
          title={args.title}
          colorTheme="dark"
          buttonString={args.buttonString}
          onConfirm={() => setIsOpen(false)}>
          <span>This is a dialog</span>
          <span>Click the button below to close.</span>
        </ConfirmDialog>
      </div>
    )
  },
  args: {
    open: false,
    colorTheme: 'dark',
    title: 'Confirm Dialog',
    buttonString: 'OK',
    ariaLabel: 'Confirm OK'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
