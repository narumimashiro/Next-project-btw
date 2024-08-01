import type { Meta, StoryObj } from '@storybook/react'

import { TextField, TextFieldProps } from './TextField'

const meta = {
  title: 'BTW-Custom/TextField',
  component: TextField,
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
    className: { control: false },
    colorTheme: { control: false },
    onChangeInput: { control: false }
  }
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof TextField>

const TemplateStory: Story = {
  render: (args: TextFieldProps) => {
    return <TextField {...args} />
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    placeholder: 'placeholder',
    maxLength: 7,
    clearButton: false,
    isError: false,
    errorString: ''
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
    placeholder: 'placeholder',
    maxLength: 7,
    clearButton: false,
    isError: false,
    errorString: ''
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export const ClearLight: Story = {
  ...TemplateStory,
  args: {
    placeholder: 'placeholder',
    maxLength: 7,
    clearButton: true,
    isError: false,
    errorString: ''
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
}

export const ClearDark: Story = {
  ...TemplateStory,
  args: {
    placeholder: 'placeholder',
    maxLength: 7,
    clearButton: true,
    isError: false,
    errorString: ''
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export const ErrorLight: Story = {
  ...TemplateStory,
  args: {
    placeholder: 'placeholder',
    maxLength: 7,
    clearButton: false,
    isError: true,
    errorString: 'なんで春日影やったの!!!!!'
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
}

export const ErrorDark: Story = {
  ...TemplateStory,
  args: {
    placeholder: 'placeholder',
    maxLength: 7,
    clearButton: false,
    isError: true,
    errorString: 'なんで春日影やったの!!!!!'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
