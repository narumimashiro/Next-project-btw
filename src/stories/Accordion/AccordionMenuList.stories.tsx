import type { Meta, StoryObj } from '@storybook/react'

import { AccordionMenuList, AccordionMenuListProps } from './AccordionMenuList'

const meta = {
  title: 'BTW-Custom/AccordionMenuList',
  component: AccordionMenuList,
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
    colorTheme: { control: false }
  }
} satisfies Meta<typeof AccordionMenuList>

export default meta

type Story = StoryObj<typeof AccordionMenuList>

const TemplateStory: Story = {
  render: (args: AccordionMenuListProps) => (
    <div style={{ width: '75%', height: 390, justifyContent: 'center', alignItems: 'center' }}>
      <AccordionMenuList {...args} />
    </div>
  )
}

export const Light: Story = {
  ...TemplateStory,
  args: {
    summary: 'sample summary',
    menuList: [
      {
        isInternalLink: false,
        displayText: 'project SEKAI',
        link: 'https://pjsekai.sega.jp/'
      },
      {
        isInternalLink: false,
        displayText: 'ArkNights',
        link: 'https://www.arknights.jp/'
      },
      {
        isInternalLink: false,
        displayText: 'Genshin',
        link: 'https://genshin.hoyoverse.com/ja/home'
      },
      {
        isInternalLink: false,
        displayText: 'Ado ﾄﾞｷﾄﾞｷ秘密基地',
        link: 'https://ado-dokidokihimitsukichi-daigakuimo.com/'
      },
      {
        isInternalLink: true,
        displayText: 'internal link',
        link: '/internal-link'
      }
    ]
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
    menuList: [
      {
        isInternalLink: false,
        displayText: 'project SEKAI',
        link: 'https://pjsekai.sega.jp/'
      },
      {
        isInternalLink: false,
        displayText: 'ArkNights',
        link: 'https://www.arknights.jp/'
      },
      {
        isInternalLink: false,
        displayText: 'Genshin',
        link: 'https://genshin.hoyoverse.com/ja/home'
      },
      {
        isInternalLink: false,
        displayText: 'Ado ﾄﾞｷﾄﾞｷ秘密基地',
        link: 'https://ado-dokidokihimitsukichi-daigakuimo.com/'
      },
      {
        isInternalLink: true,
        displayText: 'internal link',
        link: '/internal-link'
      }
    ]
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export const ListRightLight: Story = {
  ...TemplateStory,
  args: {
    summary: 'sample summary',
    menuList: [
      {
        isInternalLink: false,
        displayText: 'project SEKAI',
        link: 'https://pjsekai.sega.jp/'
      },
      {
        isInternalLink: false,
        displayText: 'ArkNights',
        link: 'https://www.arknights.jp/'
      },
      {
        isInternalLink: false,
        displayText: 'Genshin',
        link: 'https://genshin.hoyoverse.com/ja/home'
      },
      {
        isInternalLink: false,
        displayText: 'Ado ﾄﾞｷﾄﾞｷ秘密基地',
        link: 'https://ado-dokidokihimitsukichi-daigakuimo.com/'
      },
      {
        isInternalLink: true,
        displayText: 'internal link',
        link: '/internal-link'
      }
    ],
    listType: 'right'
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
}

export const ListRightDark: Story = {
  ...TemplateStory,
  args: {
    colorTheme: 'dark',
    summary: 'sample summary',
    menuList: [
      {
        isInternalLink: false,
        displayText: 'project SEKAI',
        link: 'https://pjsekai.sega.jp/'
      },
      {
        isInternalLink: false,
        displayText: 'ArkNights',
        link: 'https://www.arknights.jp/'
      },
      {
        isInternalLink: false,
        displayText: 'Genshin',
        link: 'https://genshin.hoyoverse.com/ja/home'
      },
      {
        isInternalLink: false,
        displayText: 'Ado ﾄﾞｷﾄﾞｷ秘密基地',
        link: 'https://ado-dokidokihimitsukichi-daigakuimo.com/'
      },
      {
        isInternalLink: true,
        displayText: 'internal link',
        link: '/internal-link'
      }
    ],
    listType: 'right'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
