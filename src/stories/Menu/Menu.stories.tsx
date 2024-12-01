import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Menu, MenuProps } from './Menu'

const meta = {
  title: 'BTW-Custom/Menu',
  component: Menu,
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
    colorTheme: { control: false }
  }
} satisfies Meta<typeof Menu>

export default meta

type Story = StoryObj<typeof Menu>

const TemplateStory: Story = {
  render: (args: MenuProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    const handleSetAnchor = (
      e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>
    ) => {
      setAnchorEl(e.currentTarget)
    }

    const handlerReleaseAnchor = () => setAnchorEl(null)

    return (
      <>
        <button onClick={handleSetAnchor}>Open Menu</button>
        <Menu {...args} anchorEl={anchorEl} handleReleaseAnchor={handlerReleaseAnchor}>
          <p>Test</p>
        </Menu>
      </>
    )
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {},
  parameters: {
    backgrounds: {
      default: 'light'
    }
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
