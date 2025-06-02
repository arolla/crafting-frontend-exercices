import type { Meta, StoryObj } from '@storybook/web-components'
import { Summary } from './summary'

Summary.register()

const meta: Meta<Summary> = {
  title: 'Components/Summary',
  component: 'arl-summary',
  argTypes: {
    stake: {
      control: 'number',
    },
  },
  args: {
    stake: 100,
    betsSlip: [
      {
        gameId: 'gameId',
        selectedChoice: 'TEAM_1_WINS',
        selectedOdds: 2.98,
      },
      {
        gameId: 'gameId',
        selectedChoice: 'DRAW',
        selectedOdds: 1.64,
      },
    ],
  },
}

export default meta

type Story = StoryObj<Summary>

export const Default: Story = {}
