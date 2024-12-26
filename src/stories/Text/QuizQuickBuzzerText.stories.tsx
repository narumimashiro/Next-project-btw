import { useState } from 'react'

import { QuizQuickBuzzerText } from './QuizQuickBuzzerText'
import { BasicButton } from '../Button/BasicButton'

import type { QuizQuickBuzzerTextProps } from './QuizQuickBuzzerText'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'BTW-Custom/QuizQuickBuzzerText',
  component: QuizQuickBuzzerText,
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
    setPushPoint: { control: false }
  }
} satisfies Meta<typeof QuizQuickBuzzerText>

export default meta

type Story = StoryObj<typeof QuizQuickBuzzerText>

const TemplateStory: Story = {
  render: (args: QuizQuickBuzzerTextProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [pause, setPause] = useState(args.pause)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: 390, height: 250 }}>
        <QuizQuickBuzzerText {...args} pause={pause} />
        <BasicButton
          className="absolute-center"
          style={{ bottom: 0, height: 40 }}
          onClick={() => setPause(!pause)}>
          早押しボタン
        </BasicButton>
      </div>
    )
  }
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    text: '雨の中傘を差しているジャケット写真のアニメOPにもなった楽曲名を漢字で答えよ。',
    speedSeconds: 0.1,
    pause: false
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
    text: '燈の心の叫び、語りから始まる楽曲はいくつかありますが、「春日影」、「詩超絆」、「音一会」のうち該当しないのはどれ？',
    speedSeconds: 0.1,
    pause: false
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
