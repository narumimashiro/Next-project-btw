import { Pagination } from './Pagination'

import type { PaginationProps } from './Pagination'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'BTW-Custom/Pagination',
  component: Pagination,
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
    onChange: { control: false }
  }
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof Pagination>

const TemplateStory: Story = {
  render: (args: PaginationProps) => {
    return <Pagination {...args} />
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    count: 11,
    siblingCount: 1,
    size: 'middle'
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
    colorTheme: 'dark',
    count: 11,
    siblingCount: 1,
    size: 'middle'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
