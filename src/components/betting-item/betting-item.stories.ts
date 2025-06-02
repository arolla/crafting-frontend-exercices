import type { Meta, StoryObj } from '@storybook/web-components'
import { BettingItem } from './betting-item'

BettingItem.register()

const meta: Meta<BettingItem> = {
  title: 'Components/Betting Item',
  component: 'arl-betting-item',
  play: (context) => {
    const { gameOdds } = context.args
    if (!gameOdds) {
      return
    }
    const bettingItem = document.querySelector<BettingItem>('arl-betting-item')
    if (!bettingItem) {
      return
    }
    bettingItem.gameOdds = gameOdds
  },
}

export default meta

type Story = StoryObj<BettingItem>

export const Default: Story = {
  args: {
    gameOdds: {
      gameId: '1',
      team1: 'Newcastle',
      team2: 'Liverpool',
      oddsTeam1: 1.23,
      oddsDraw: 2.54,
      oddsTeam2: 3.88,
    },
  },
}

export const EmptyBettingItem: Story = {}
