import type { Meta, StoryObj } from '@storybook/react'

import AppleIcon from '@mui/icons-material/Apple'
import AndroidIcon from '@mui/icons-material/Android'

import { ListItem, ListItemProps } from './ListItem'

const meta = {
  title: 'BTW-Custom/ListItem',
  component: ListItem,
  parameters: {
    layout: 'centered',
    backgrounds: {
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#333333' }
      ]
    }
  },
  args: {},
  argTypes: {
    colorTheme: { control: false },
    icon: { control: false },
    onClick: { control: false }
  }
} satisfies Meta<typeof ListItem>

export default meta

type Story = StoryObj<typeof ListItem>

const TemplateStory: Story = {
  render: (args: ListItemProps) => {
    return <ListItem {...args} />
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    text: 'Text List Item'
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
    text: 'Text List Item',
    colorTheme: 'dark'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export const IconLight: Story = {
  ...TemplateStory,
  args: {
    text: 'Text List Item',
    icon: <AppleIcon />
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
}

export const IconDark: Story = {
  ...TemplateStory,
  args: {
    text: 'Text List Item',
    icon: <AndroidIcon />,
    colorTheme: 'dark'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
