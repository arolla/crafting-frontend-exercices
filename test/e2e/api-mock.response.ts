import type { GameApiResponse } from '@models/api/game-api-response'
import type { OddsApiResponse } from '@models/api/odds-api-response'

export const mockedApiGamesResponse: { games: GameApiResponse[] } = {
  games: [
    {
      id: 'gameId1',
      team1: 'team1',
      team2: 'team2',
      date: 'date',
      country: 'country',
      city: 'city',
      stadium: 'stadium',
    },
    {
      id: 'gameId2',
      team1: 'team3',
      team2: 'team4',
      date: 'date',
      country: 'country',
      city: 'city',
      stadium: 'stadium',
    },
  ],
}

export const mockedApiOddsResponse: { odds: OddsApiResponse[] } = {
  odds: [
    {
      id: 'id1',
      gameId: 'gameId1',
      oddsTeam1: 1.1,
      oddsDraw: 2.2,
      oddsTeam2: 0.5,
      bookmakerName: 'bookmakerName',
    },
    {
      id: 'id2',
      gameId: 'gameId2',
      oddsTeam1: 2.3,
      oddsDraw: 4.1,
      oddsTeam2: 2.1,
      bookmakerName: 'bookmakerName',
    },
  ],
}
