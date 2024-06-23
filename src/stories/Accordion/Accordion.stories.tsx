import type { Meta, StoryObj } from '@storybook/react'

import { Accordion, AccordionProps } from './Accordion'

const meta = {
  title: 'BTW-Custom/Accordion',
  component: Accordion,
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
    summaryStyle: { control: false },
    detailStyle: { control: false },
    colorTheme: { control: false },
    detailComponent: { control: false }
  }
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof Accordion>

const TemplateStory: Story = {
  render: (args: AccordionProps) => (
    <div style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center' }}>
      <Accordion {...args} />
    </div>
  )
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    summary: 'sample summary',
    detailTextList: ['TEXTTEXTTEXTTEXTTEXTTEXT', 'TEXTTEXTTEXTTEXTTEXTTEXT']
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
    summary: 'sample summary',
    detailTextList: ['TEXTTEXTTEXTTEXTTEXTTEXT', 'TEXTTEXTTEXTTEXTTEXTTEXT']
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
