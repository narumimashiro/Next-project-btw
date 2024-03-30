import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

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
    children: <></>,
  },
  argTypes: {
    open: { control: false },
    colorTheme: { control: false },
    children: { table: { disable: true }},
    onConfirm: { control: false },
  },
} satisfies Meta<typeof ConfirmDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div>
        <button onClick={() => setIsOpen(true)}>{args.buttonString || 'Open Dialog'}</button>
        <ConfirmDialog
          open={isOpen}
          title={args.title || 'Confirm Dialog'}
          colorTheme='light'
          onConfirm={() => setIsOpen(false)}
        >
          <span>This is a dialog</span>
          <span>Click the button below to close.</span>
        </ConfirmDialog>
      </div>
    )
  },
  args: {
    open: true,
    colorTheme: 'light',
    title: 'Confirm Dialog',
    buttonString: 'Open Dialog',
    ariaLabel: 'Confirm OK',
    onConfirm: () => {}
  },
  parameters: {
    backgrounds: {
      default: 'light'
    },
  },
};

export const Dark: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div>
        <button onClick={() => setIsOpen(true)}>{args.buttonString || 'Open Dialog'}</button>
        <ConfirmDialog
          open={isOpen}
          title={args.title || 'Confirm Dialog'}
          colorTheme='dark'
          onConfirm={() => setIsOpen(false)}
        >
          <span>This is a dialog</span>
          <span>Click the button below to close.</span>
        </ConfirmDialog>
      </div>
    )
  },
  args: {
    open: true,
    colorTheme: 'dark',
    title: 'Confirm Dialog',
    buttonString: 'Open Dialog',
    ariaLabel: 'Confirm OK',
    onConfirm: () => {}
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    },
  },
};