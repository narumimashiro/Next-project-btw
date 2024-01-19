# StoryBook Component Template

## Template.tsx

```ts
import React from 'react'
import './template.css'

interface TemplateProps {

}

export const Template = ({

}: TemplateProps) => {

  return (
    <></>
  )
}
```

## Template.stories.ts

```ts
import type { Meta, StoryObj } from '@storybook/react'

import { Template } from './Template'

const meta = {
  title: 'BTW-Custom/Template',
  component: Template,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    backgroundColor: { control: 'color' },
  }
} satisfies Meta<typeof Template>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {

}
```