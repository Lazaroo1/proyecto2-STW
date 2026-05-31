import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../components/Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    onClick: () => undefined
  }
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const NumberButton: Story = {
  args: {
    label: '5',
    variant: 'number'
  }
}

export const OperatorButton: Story = {
  args: {
    label: '+',
    variant: 'operator'
  }
}

export const EqualButton: Story = {
  args: {
    label: '=',
    variant: 'equal'
  }
}

export const ActionButton: Story = {
  args: {
    label: 'C',
    variant: 'action'
  }
}
