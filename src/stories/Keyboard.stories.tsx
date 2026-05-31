import type { Meta, StoryObj } from '@storybook/react-vite'
import { Keyboard } from '../components/Keyboard'

const noop = (): void => undefined

const meta = {
  title: 'Components/Keyboard',
  component: Keyboard
} satisfies Meta<typeof Keyboard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onCalculate: noop,
    onClear: noop,
    onDecimal: noop,
    onDigit: noop,
    onOperator: noop,
    onToggleSign: noop
  }
}
