import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup, RadioGroupProps } from './RadioGroup'

const meta = {
  title: 'BTW-Custom/RadioGroup',
  component: RadioGroup,
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
    radioProps: { control: false },
    onChange: { control: false }
  }
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof RadioGroup>

const TemplateStory: Story = {
  render: (args: RadioGroupProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [current, setCurrent] = useState(args.currentValue)

    return (
      <RadioGroup {...args} currentValue={current} onChange={(value) => setCurrent(value)} />
    )
  }
}

export const LightRow: Story = {
  ...TemplateStory,
  args: {
    name: 'sample',
    currentValue: 'Option1',
    optionList: [
      { label: 'Option1', value: 'Option1' },
      { label: 'Option2', value: 'Option2' },
      { label: 'Option3', value: 'Option3' },
      { label: 'Option4', value: 'Option4' }
    ]
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
}

export const DarkRow: Story = {
  ...TemplateStory,
  args: {
    colorTheme: 'dark',
    name: 'sample',
    currentValue: 'Option1',
    optionList: [
      { label: 'Option1', value: 'Option1' },
      { label: 'Option2', value: 'Option2' },
      { label: 'Option3', value: 'Option3' },
      { label: 'Option4', value: 'Option4' }
    ]
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export const LightColumn: Story = {
  ...TemplateStory,
  args: {
    name: 'sample',
    currentValue: 'Option1',
    optionList: [
      { label: 'Option1', value: 'Option1' },
      { label: 'Option2', value: 'Option2' },
      { label: 'Option3', value: 'Option3' },
      { label: 'Option4', value: 'Option4' }
    ],
    radioType: 'column'
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
}

export const DarkColumn: Story = {
  ...TemplateStory,
  args: {
    colorTheme: 'dark',
    name: 'sample',
    currentValue: 'Option1',
    optionList: [
      { label: 'Option1', value: 'Option1' },
      { label: 'Option2', value: 'Option2' },
      { label: 'Option3', value: 'Option3' },
      { label: 'Option4', value: 'Option4' }
    ],
    radioType: 'column'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
