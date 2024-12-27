import { OutlineText } from './OutlineText'

import type { OutlineTextProps } from './OutlineText'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'BTW-Custom/OutlineText',
  component: OutlineText,
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
    className: { control: false }
  }
} satisfies Meta<typeof OutlineText>

export default meta

type Story = StoryObj<typeof OutlineText>

const TemplateStory: Story = {
  render: (args: OutlineTextProps) => {
    return <OutlineText {...args} />
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    text: 'Project SEKAI feat. Hatsune Miku'
  },
  argTypes: {
    customColor: { control: false }
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
    text: 'Project SEKAI feat. Hatsune Miku'
  },
  argTypes: {
    customColor: { control: false }
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export const Custom: Story = {
  ...TemplateStory,
  args: {
    text: 'Project SEKAI feat. Hatsune Miku',
    customColor: {
      light: {
        backgroundColor: '#ffffff',
        outlineColor: '#039393'
      },
      dark: {
        backgroundColor: '#ffffff',
        outlineColor: '#039393'
      }
    }
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
}
