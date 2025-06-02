import type { Meta, StoryObj } from '@storybook/web-components'
import { Footer } from './footer'

Footer.register()

const meta: Meta<Footer> = {
  title: 'Components/Footer',
  component: 'arl-footer',
  args: {
    userLoggedIn: false,
  },
}

export default meta

type Story = StoryObj<Footer>

export const Default: Story = {}
