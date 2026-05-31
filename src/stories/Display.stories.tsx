import type { Meta, StoryObj } from '@storybook/react-vite'
import { Display } from '../components/Display'

const meta = {
  title: 'Components/Display',
  component: Display
} satisfies Meta<typeof Display>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: '123'
  }
}

export const LongNumber: Story = {
  args: {
    value: '999999999'
  }
}

export const ErrorState: Story = {
  args: {
    value: 'ERROR'
  }
}
