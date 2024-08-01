import type { Meta, StoryObj } from '@storybook/react'

import AppleIcon from '@mui/icons-material/Apple'
import AndroidIcon from '@mui/icons-material/Android'

import { List, ListProps } from './List'
import { ListItem } from './ListItem'

const meta = {
  title: 'BTW-Custom/List',
  component: List,
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
} satisfies Meta<typeof List>

export default meta

type Story = StoryObj<typeof List>

const TemplateStory: Story = {
  render: (args: ListProps) => {
    const sampleList = [
      {
        text: 'Apple',
        icon: <AppleIcon />
      },
      {
        text: 'Androild',
        icon: <AndroidIcon />
      }
    ]

    return (
      <List {...args}>
        {sampleList.map((item) => (
          <ListItem
            key={item.text}
            colorTheme={args.colorTheme}
            text={item.text}
            icon={item.icon}
            onClick={() => {}}
          />
        ))}
      </List>
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

export const GroupNameLight: Story = {
  ...TemplateStory,
  args: {
    groupName: 'Smart Phone'
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
}

export const GroupNameDark: Story = {
  ...TemplateStory,
  args: {
    groupName: 'Smart Phone',
    colorTheme: 'dark'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
