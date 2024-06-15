import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { API_STATUS, AptStatusType } from '@/hooks/useApiStatus'
import { ApiFetchDialog, ApiFetchDialogProps } from './ApiFetchDialog'

const meta = {
  title: 'BTW-Custom/Dialog/ApiFetchDialog',
  component: ApiFetchDialog,
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
    apiStatus: API_STATUS.IDLE,
    resetApiState: () => {}
  },
  argTypes: {
    apiStatus: { control: false },
    colorTheme: { control: false },
    resetApiState: { control: false },
    bodySuccess: {
      onClick: { control: false }
    },
    bodyFailed: {
      onClick: { control: false }
    }
  }
} satisfies Meta<typeof ApiFetchDialog>

export default meta

type Story = StoryObj<typeof ApiFetchDialog>

const SampleApi = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [status, setStatus] = useState<AptStatusType>(API_STATUS.IDLE)

  const sampleApi = async (result: boolean) => {
    setStatus(API_STATUS.LOADING)

    setTimeout(() => {
      if (result) {
        setStatus(API_STATUS.SUCCESS)
      } else {
        setStatus(API_STATUS.FAILED)
      }
    }, 5 * 1000)
  }

  const resetApi = () => {
    setStatus(API_STATUS.IDLE)
  }

  return { status, sampleApi, resetApi }
}

const TemplateSuccessStory: Story = {
  render: (args: ApiFetchDialogProps) => {
    const { status: sampleApiFetchState, sampleApi, resetApi } = SampleApi()

    return (
      <>
        <button onClick={() => sampleApi(true)}>Call Sample API</button>
        <ApiFetchDialog {...args} apiStatus={sampleApiFetchState} resetApiState={resetApi} />
      </>
    )
  }
}

const TemplateFailedStory: Story = {
  render: (args: ApiFetchDialogProps) => {
    const { status: sampleApiFetchState, sampleApi, resetApi } = SampleApi()

    return (
      <>
        <button onClick={() => sampleApi(false)}>Call Sample API</button>
        <ApiFetchDialog {...args} apiStatus={sampleApiFetchState} resetApiState={resetApi} />
      </>
    )
  }
}

export const SuccessLight: Story = {
  ...TemplateSuccessStory,
  args: {
    colorTheme: 'light',
    bodyLoading: {
      title: 'Loading API',
      bodyText: ['API呼び出し中です...', 'しばらくお待ちください']
    },
    bodySuccess: {
      title: 'Success API',
      bodyText: ['成功しました', 'OKでダイアログが閉じます']
    },
    bodyFailed: {
      title: 'Failed API',
      bodyText: ['失敗しました']
    }
  }
}

export const SuccessDark: Story = {
  ...TemplateSuccessStory,
  args: {
    colorTheme: 'dark',
    bodyLoading: {
      title: 'Loading API',
      bodyText: ['API呼び出し中です...']
    },
    bodySuccess: {
      title: 'Success API',
      bodyText: ['成功しました']
    },
    bodyFailed: {
      title: 'Failed API',
      bodyText: ['失敗しました']
    }
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    },
    theme: 'dark'
  }
}

export const FailedLight: Story = {
  ...TemplateFailedStory,
  args: {
    colorTheme: 'light',
    bodyLoading: {
      title: 'Loading API',
      bodyText: ['API呼び出し中です...']
    },
    bodySuccess: {
      title: 'Success API',
      bodyText: ['成功しました']
    },
    bodyFailed: {
      title: 'Failed API',
      bodyText: ['失敗しました']
    }
  }
}

export const FailedDark: Story = {
  ...TemplateFailedStory,
  args: {
    colorTheme: 'dark',
    bodyLoading: {
      title: 'Loading API',
      bodyText: ['API呼び出し中です...']
    },
    bodySuccess: {
      title: 'Success API',
      bodyText: ['成功しました']
    },
    bodyFailed: {
      title: 'Failed API',
      bodyText: ['失敗しました']
    }
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    },
    theme: 'dark'
  }
}
