import type { GameApiResponse } from '@models/api/game-api-response'

export const gamesApiResponse: { games: GameApiResponse[] } = {
  games: [
    {
      id: '1',
      team1: 'Manchester City',
      team2: 'Arsenal',
      date: '12/05/2022',
      country: 'United Kingdom',
      city: 'Manchester',
      stadium: 'Stade 1',
    },
    {
      id: '2',
      team1: 'Newcastle',
      team2: 'Liverpool',
      date: '02/01/2022',
      country: 'United Kingdom',
      city: 'Newcastle',
      stadium: 'Stade 7',
    },
    {
      id: '3',
      team1: 'Chelsea',
      team2: 'Aston Villa',
      date: '14/11/2022',
      country: 'United Kingdom',
      city: 'Chelsea',
      stadium: 'Stade 5',
    },
  ],
}
