import { gamesApiResponse } from '@api/games.response'
import { oddsApiResponse } from '@api/odds.response'
import type { Meta, StoryObj } from '@storybook/web-components'
import { http, HttpResponse } from 'msw'
import { BettingList } from './betting-list'

BettingList.register()

const meta: Meta<BettingList> = {
  title: 'Components/Betting List',
  component: 'arl-betting-list',
}

export default meta

type Story = StoryObj<BettingList>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:3000/api/games', () => {
          return HttpResponse.json(gamesApiResponse)
        }),
        http.get('http://localhost:3000/api/odds', () => {
          return HttpResponse.json(oddsApiResponse)
        }),
      ],
    },
  },
}
