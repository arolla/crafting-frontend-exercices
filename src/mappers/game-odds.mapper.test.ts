import { toGameOdds } from './game-odds.mapper'

describe('mappers', () => {
  describe('game odds mapper', () => {
    describe('toGameOdds', () => {
      test('should matching game odds given games and odds', () => {
        // Given
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
        // When
        const result = toGameOdds(gamesApiResponse, oddsApiResponse)
        // Then
        expect(result).toStrictEqual([
          {
            gameId: '1',
            team1: 'Newcastle',
            team2: 'Liverpool',
            oddsTeam1: 1.2,
            oddsDraw: 2.32,
            oddsTeam2: 4.89,
          },
        ])
      })
    })
  })
})
