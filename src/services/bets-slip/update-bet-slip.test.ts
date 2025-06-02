import type { BetSlip } from '@models/bets/bet-slip'
import type { GameOdds } from '@models/games/game-odds'
import { updateBetSlip } from '@services/bets-slip/update-bet-slip'
import { TEAM_1_WINS, TEAM_2_WINS } from '@shared/constants/bet-choice'

describe('services', () => {
  describe('bet slip', () => {
    describe('update bet slip', () => {
      describe('updateBetSlip', () => {
        const betSlips: BetSlip[] = [
          {
            gameId: '1',
            selectedChoice: TEAM_1_WINS,
            selectedOdds: 2.18,
          },
        ]
        test('should add a new bet slip given user choose a unexisting bet slip', () => {
          // Given
          const gameOdds: GameOdds = {
            gameId: '2',
            team1: 'Newcastle',
            team2: 'Liverpool',
            oddsTeam1: 1.12,
            oddsDraw: 2.5,
            oddsTeam2: 3.62,
          }
          // When
          const result = updateBetSlip(betSlips, gameOdds, TEAM_2_WINS)
          // Then
          expect(result).toStrictEqual([
            {
              gameId: '1',
              selectedChoice: TEAM_1_WINS,
              selectedOdds: 2.18,
            },
            {
              gameId: '2',
              selectedChoice: TEAM_2_WINS,
              selectedOdds: 3.62,
            },
          ])
        })
        test('should update the bet slip choice given user select a new choice on existing bet slip', () => {
          // Given
          const gameOdds: GameOdds = {
            gameId: '1',
            team1: 'Manchester City',
            team2: 'Arsenal',
            oddsTeam1: 1.24,
            oddsDraw: 2.18,
            oddsTeam2: 2.57,
          }
          // When
          const result = updateBetSlip(betSlips, gameOdds, TEAM_2_WINS)
          // Then
          expect(result).toStrictEqual([
            {
              gameId: '1',
              selectedChoice: TEAM_2_WINS,
              selectedOdds: 2.57,
            },
          ])
        })
      })
    })
  })
})
