import { gamesApiResponse } from '@api/games.response'
import { oddsApiResponse } from '@api/odds.response'
import { BettingPage } from '@pages/betting-page'
import type { Meta, StoryObj } from '@storybook/web-components'
import { http, HttpResponse } from 'msw'

BettingPage.register()

const meta: Meta<BettingPage> = {
  title: 'Pages/BettingPage',
  component: 'arl-betting-page',
}

export default meta

type Story = StoryObj<BettingPage>

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
