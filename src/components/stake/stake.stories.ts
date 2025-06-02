import type { Meta, StoryObj } from '@storybook/web-components'
import { Stake } from './stake'

Stake.register()

const meta: Meta<Stake> = {
  title: 'Components/Stake',
  component: 'arl-stake',
}

export default meta

type Story = StoryObj<Stake>

export const Default: Story = {}
