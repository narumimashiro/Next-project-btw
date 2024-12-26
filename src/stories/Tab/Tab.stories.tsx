import { useState } from 'react'

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import PianoIcon from '@mui/icons-material/Piano'
import UmbrellaIcon from '@mui/icons-material/Umbrella'

import { Tabs, TabPanel } from './Tab'

import type { TabsProps } from './Tab'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'BTW-Custom/Tab',
  component: Tabs,
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
    className: { control: false }
  }
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof Tabs>

const TemplateStory: Story = {
  render: (args: TabsProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectTab, setSelectTab] = useState(args.value)

    return (
      <>
        <Tabs {...args} onChange={setSelectTab} value={selectTab} />
        <TabPanel value={selectTab} tabIndex={0}>
          <div style={{ textAlign: 'center' }}>Tab1</div>
        </TabPanel>
        <TabPanel value={selectTab} tabIndex={0}>
          <div style={{ textAlign: 'center' }}>Tab2</div>
        </TabPanel>
        <TabPanel value={selectTab} tabIndex={0}>
          <div style={{ textAlign: 'center' }}>Tab3</div>
        </TabPanel>
      </>
    )
  }
}

export const UnderlineLight: Story = {
  ...TemplateStory,
  args: {
    tabList: [{ label: 'MyGO!!!!!' }, { label: 'Roselia' }, { label: 'Liella' }],
    value: 0,
    variant: 'underline'
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
}

export const UnderlineDark: Story = {
  ...TemplateStory,
  args: {
    tabList: [{ label: 'MyGO!!!!!' }, { label: 'Roselia' }, { label: 'Liella' }],
    value: 0,
    variant: 'underline'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export const IconUnderlineLight: Story = {
  ...TemplateStory,
  args: {
    tabList: [
      { label: 'MyGO!!!!!', icon: <UmbrellaIcon /> },
      { label: 'Roselia', icon: <PianoIcon /> },
      { label: 'Liella', icon: <AutoAwesomeIcon /> }
    ],
    value: 0,
    variant: 'underline'
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
}

export const IconUnderlineDark: Story = {
  ...TemplateStory,
  args: {
    tabList: [
      { label: 'MyGO!!!!!', icon: <UmbrellaIcon /> },
      { label: 'Roselia', icon: <PianoIcon /> },
      { label: 'Liella', icon: <AutoAwesomeIcon /> }
    ],
    value: 0,
    variant: 'underline'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export const StickyNoteLight: Story = {
  ...TemplateStory,
  args: {
    tabList: [{ label: 'MyGO!!!!!' }, { label: 'Roselia' }, { label: 'Liella!' }],
    value: 0,
    variant: 'sticky_note'
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
}

export const StickyNoteDark: Story = {
  ...TemplateStory,
  args: {
    tabList: [{ label: 'MyGO!!!!!' }, { label: 'Roselia' }, { label: 'Liella!' }],
    value: 0,
    variant: 'sticky_note'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export const IconStickyNoteLight: Story = {
  ...TemplateStory,
  args: {
    tabList: [
      { label: 'MyGO!!!!!', icon: <UmbrellaIcon /> },
      { label: 'Roselia', icon: <PianoIcon /> },
      { label: 'Liella', icon: <AutoAwesomeIcon /> }
    ],
    value: 0,
    variant: 'sticky_note'
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
}

export const IconStickyNoteDark: Story = {
  ...TemplateStory,
  args: {
    tabList: [
      { label: 'MyGO!!!!!', icon: <UmbrellaIcon /> },
      { label: 'Roselia', icon: <PianoIcon /> },
      { label: 'Liella', icon: <AutoAwesomeIcon /> }
    ],
    value: 0,
    variant: 'sticky_note'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
