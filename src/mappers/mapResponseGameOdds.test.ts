import { describe, expect, it } from '@jest/globals'
import { mapResponseToGameOdds } from './mapResponseGameOdds'

describe('map Response To GameOdds', () => {
  it('return correct mapping', () => {
    const gamesApiResponse = [
      {
        id: '1',
        type: 'football',
        team1: 'Newcastle',
        team2: 'Liverpool',
        date: '12/05/2022',
        country: 'United Kingdom',
        city: 'Newcastle',
        stadium: 'Stade 1',
      },
    ]

    const oddsApiResponse = [
      {
        id: 'dhyg2et',
        gameId: '1',
        oddsTeam1: 1.2,
        oddsDraw: 2.32,
        oddsTeam2: 4.89,
        bookmakerName: 'Jane',
      },
    ]

    expect(mapResponseToGameOdds(gamesApiResponse, oddsApiResponse)).toEqual([
      {
        //TODO let's add an expectation here
      },
    ])
  })
})
