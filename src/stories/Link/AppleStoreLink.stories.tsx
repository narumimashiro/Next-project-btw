import type { Meta, StoryObj } from '@storybook/react'

import { AppleStoreLink, AppleStoreLinkProps } from './AppleStoreLink'

const meta = {
  title: 'BTW-Custom/AppleStoreLink',
  component: AppleStoreLink,
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
  argTypes: {}
} satisfies Meta<typeof AppleStoreLink>

export default meta

type Story = StoryObj<typeof AppleStoreLink>

const TemplateStory: Story = {
  render: (args: AppleStoreLinkProps) => {
    return <AppleStoreLink {...args} />
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    link: 'https://apps.apple.com/jp/app/%E3%82%A2%E3%83%BC%E3%82%AF%E3%83%8A%E3%82%A4%E3%83%84/id1478990007'
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
    link: 'https://apps.apple.com/jp/app/%E3%82%A2%E3%83%BC%E3%82%AF%E3%83%8A%E3%82%A4%E3%83%84/id1478990007e'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
