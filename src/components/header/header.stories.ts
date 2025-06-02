import type { Meta, StoryObj } from '@storybook/web-components'
import { Header } from './header'

Header.register()

const meta: Meta<Header> = {
  title: 'Components/Header',
  component: 'arl-header',
}

export default meta

type Story = StoryObj<Header>

export const Default: Story = {}
