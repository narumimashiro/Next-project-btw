# StoryBook Component Template

## Template.stories.tsx

```tsx
import type { Meta, StoryObj } from '@storybook/react'

import { BasicButton, BasicButtonProps } from './BasicButton'

const meta = {
  title: 'BTW-Custom/Button/BasicButton',
  component: BasicButton,
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
  },
} satisfies Meta<typeof BasicButton>

export default meta

type Story = StoryObj<typeof BasicButton>

const TemplateStory: Story = {
  render: (args: BasicButtonProps) => <BasicButton {...args} />
}

export const Light: Story = {
  ...TemplateStory,
  args: {

  }
}

```