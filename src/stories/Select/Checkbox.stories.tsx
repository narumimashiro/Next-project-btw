import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox, CheckboxProps } from './Checkbox'

const meta = {
  title: 'BTW-Custom/Checkbox',
  component: Checkbox,
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
    className: { control: false },
    onChange: { control: false }
  }
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof Checkbox>

const TemplateStory: Story = {
  render: (args: CheckboxProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isChecked, setIsChecked] = useState(args.isChecked)

    return (
      <Checkbox
        {...args}
        isChecked={isChecked || args.isChecked}
        onChange={(value) => setIsChecked(value as boolean)}
      />
    )
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    isChecked: false,
    disabled: false,
    filling: false
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
    isChecked: false,
    disabled: false,
    filling: false
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export const FillingLight: Story = {
  ...TemplateStory,
  args: {
    isChecked: false,
    disabled: false,
    filling: true
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
}

export const FillingDark: Story = {
  ...TemplateStory,
  args: {
    colorTheme: 'dark',
    isChecked: false,
    disabled: false,
    filling: true
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export const CheckedLight: Story = {
  ...TemplateStory,
  args: {
    isChecked: true,
    disabled: false,
    filling: false
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
}

export const CheckedDark: Story = {
  ...TemplateStory,
  args: {
    colorTheme: 'dark',
    isChecked: true,
    disabled: false,
    filling: false
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export const DisabledLight: Story = {
  ...TemplateStory,
  args: {
    isChecked: false,
    disabled: true,
    filling: false
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
}

export const DisabledDark: Story = {
  ...TemplateStory,
  args: {
    colorTheme: 'dark',
    isChecked: false,
    disabled: true,
    filling: false
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
