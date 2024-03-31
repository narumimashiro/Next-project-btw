import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { API_STATUS, AptStatusType } from '@/hooks/useApiStatus'
import { ApiFetchDialog } from './ApiFetchDialog'

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
  tags: ['autodocs'],
  args: {
    apiStatus: API_STATUS.IDLE,
    resetApiState: () => {}
  },
  argTypes: {
    apiStatus: { control: false },
    colorTheme: { control: false },
    resetApiState: { control: false },
    bodySuccess: {
      onClick: { control: false },
    },
    bodyFailed: {
      onClick: { control: false },
    }
  },
} satisfies Meta<typeof ApiFetchDialog>

export default meta
type Story = StoryObj<typeof meta>

const SampleApi = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [status, setStatus] = useState<AptStatusType>(API_STATUS.IDLE)

  const sampleApi = async (result: boolean) => {
    setStatus(API_STATUS.LOADING)

    setTimeout(() => {
      if(result) {
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

export const SuccessLight: Story = {
  render: (args) => {

    const { status: sampleApiFetchState, sampleApi, resetApi } = SampleApi()

    const bodyLoading = {
      title: args.bodyLoading.title,
      bodyText: args.bodyLoading.bodyText
    }
    const bodySuccess = {
      title: args.bodySuccess.title,
      bodyText: args.bodySuccess.bodyText,
      buttonString: args.bodySuccess.buttonString,
      onClick: () => resetApi()
    }
    const bodyFailed = {
      title: args.bodyFailed.title,
      bodyText: args.bodyFailed.bodyText,
      buttonString: args.bodyFailed.buttonString,
      onClick: () => resetApi()
    }

    return (
      <div>
        <button onClick={() => sampleApi(true)}>Call Sample API</button>
        <ApiFetchDialog
          apiStatus={sampleApiFetchState}
          bodyLoading={bodyLoading}
          bodySuccess={bodySuccess}
          bodyFailed={bodyFailed}
          colorTheme='light'
          resetApiState={() => resetApi()}
        />
      </div>
    )
  },
  args: {
    colorTheme: 'light',
    bodyLoading: {
      title: 'Loading API',
      bodyText: 'API呼び出し中です...'
    },
    bodySuccess: {
      title: 'Success API',
      bodyText: '成功しました',
      buttonString: 'OK',
      onClick: () => {}
    },
    bodyFailed: {
      title: 'Failed API',
      bodyText: '失敗しました',
      buttonString: 'OK',
      onClick: () => {}
    },
  },
  parameters: {
    backgrounds: {
      default: 'light'
    },
  },
}

export const SuccessDark: Story = {
  render: (args) => {

    const { status: sampleApiFetchState, sampleApi, resetApi } = SampleApi()

    const bodyLoading = {
      title: args.bodyLoading.title,
      bodyText: args.bodyLoading.bodyText
    }
    const bodySuccess = {
      title: args.bodySuccess.title,
      bodyText: args.bodySuccess.bodyText,
      buttonString: args.bodySuccess.buttonString,
      onClick: () => resetApi()
    }
    const bodyFailed = {
      title: args.bodyFailed.title,
      bodyText: args.bodyFailed.bodyText,
      buttonString: args.bodyFailed.buttonString,
      onClick: () => resetApi()
    }

    return (
      <div>
        <button onClick={() => sampleApi(true)}>Call Sample API</button>
        <ApiFetchDialog
          apiStatus={sampleApiFetchState}
          bodyLoading={bodyLoading}
          bodySuccess={bodySuccess}
          bodyFailed={bodyFailed}
          colorTheme='dark'
          resetApiState={() => resetApi()}
        />
      </div>
    )
  },
  args: {
    colorTheme: 'dark',
    bodyLoading: {
      title: 'Loading API',
      bodyText: 'API呼び出し中です...'
    },
    bodySuccess: {
      title: 'Success API',
      bodyText: '成功しました',
      buttonString: 'OK',
      onClick: () => {}
    },
    bodyFailed: {
      title: 'Failed API',
      bodyText: '失敗しました',
      buttonString: 'OK',
      onClick: () => {}
    },
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    },
  },
}

export const FailedLight: Story = {
  render: (args) => {

    const { status: sampleApiFetchState, sampleApi, resetApi } = SampleApi()

    const bodyLoading = {
      title: args.bodyLoading.title,
      bodyText: args.bodyLoading.bodyText
    }
    const bodySuccess = {
      title: args.bodySuccess.title,
      bodyText: args.bodySuccess.bodyText,
      buttonString: args.bodySuccess.buttonString,
      onClick: () => resetApi()
    }
    const bodyFailed = {
      title: args.bodyFailed.title,
      bodyText: args.bodyFailed.bodyText,
      buttonString: args.bodyFailed.buttonString,
      onClick: () => resetApi()
    }

    return (
      <div>
        <button onClick={() => sampleApi(false)}>Call Sample API</button>
        <ApiFetchDialog
          apiStatus={sampleApiFetchState}
          bodyLoading={bodyLoading}
          bodySuccess={bodySuccess}
          bodyFailed={bodyFailed}
          colorTheme='light'
          resetApiState={() => resetApi()}
        />
      </div>
    )
  },
  args: {
    colorTheme: 'light',
    bodyLoading: {
      title: 'Loading API',
      bodyText: 'API呼び出し中です...'
    },
    bodySuccess: {
      title: 'Success API',
      bodyText: '成功しました',
      buttonString: 'OK',
      onClick: () => {}
    },
    bodyFailed: {
      title: 'Failed API',
      bodyText: '失敗しました',
      buttonString: 'OK',
      onClick: () => {}
    },
  },
  parameters: {
    backgrounds: {
      default: 'light'
    },
  },
}

export const FailedDark: Story = {
  render: (args) => {

    const { status: sampleApiFetchState, sampleApi, resetApi } = SampleApi()

    const bodyLoading = {
      title: args.bodyLoading.title,
      bodyText: args.bodyLoading.bodyText
    }
    const bodySuccess = {
      title: args.bodySuccess.title,
      bodyText: args.bodySuccess.bodyText,
      buttonString: args.bodySuccess.buttonString,
      onClick: () => resetApi()
    }
    const bodyFailed = {
      title: args.bodyFailed.title,
      bodyText: args.bodyFailed.bodyText,
      buttonString: args.bodyFailed.buttonString,
      onClick: () => resetApi()
    }

    return (
      <div>
        <button onClick={() => sampleApi(false)}>Call Sample API</button>
        <ApiFetchDialog
          apiStatus={sampleApiFetchState}
          bodyLoading={bodyLoading}
          bodySuccess={bodySuccess}
          bodyFailed={bodyFailed}
          colorTheme='dark'
          resetApiState={() => resetApi()}
        />
      </div>
    )
  },
  args: {
    colorTheme: 'dark',
    bodyLoading: {
      title: 'Loading API',
      bodyText: 'API呼び出し中です...'
    },
    bodySuccess: {
      title: 'Success API',
      bodyText: '成功しました',
      buttonString: 'OK',
      onClick: () => {}
    },
    bodyFailed: {
      title: 'Failed API',
      bodyText: '失敗しました',
      buttonString: 'OK',
      onClick: () => {}
    },
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    },
  },
}
