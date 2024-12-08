import type { Meta, StoryObj } from '@storybook/react'

import { TextLink, TextLinkProps } from './TextLink'

const meta = {
  title: 'BTW-Custom/TextLink',
  component: TextLink,
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
} satisfies Meta<typeof TextLink>

export default meta

type Story = StoryObj<typeof TextLink>

const TemplateStory: Story = {
  render: (args: TextLinkProps) => {
    return <TextLink {...args} />
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    text: '内部リンク',
    href: '/'
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
    text: '外部リンク',
    href: 'https://endfield.gryphline.com/ja-jp#home'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
