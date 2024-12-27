import { GooglePlayLink } from './GooglePlayLink'

import type { GooglePlayLinkProps } from './GooglePlayLink'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'BTW-Custom/GooglePlayLink',
  component: GooglePlayLink,
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
} satisfies Meta<typeof GooglePlayLink>

export default meta

type Story = StoryObj<typeof GooglePlayLink>

const TemplateStory: Story = {
  render: (args: GooglePlayLinkProps) => {
    return <GooglePlayLink {...args} />
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    link: 'https://play.google.com/store/apps/details?id=com.YoStarJP.Arknights'
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
    link: 'https://play.google.com/store/apps/details?id=com.YoStarJP.Arknights'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
