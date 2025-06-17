import type { OddsApiResponse } from '@models/api/odds-api-response'

export const oddsApiResponse: { odds: OddsApiResponse[] } = {
  odds: [
    {
      id: 'e54rcds78',
      gameId: '1',
      oddsTeam1: 1.24,
      oddsDraw: 2.18,
      oddsTeam2: 2.57,
      bookmakerName: 'Jane',
    },
    {
      id: 'vc14sz85',
      gameId: '2',
      oddsTeam1: 1.12,
      oddsDraw: 2.5,
      oddsTeam2: 3.62,
      bookmakerName: 'Jack',
    },
    {
      id: 'eaws4dc36',
      gameId: '3',
      oddsTeam1: 1.77,
      oddsDraw: 2.51,
      oddsTeam2: 2.9,
      bookmakerName: 'Paul',
    },
  ],
}
