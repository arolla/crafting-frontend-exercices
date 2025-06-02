import type { BetChoice } from '@models/bets/bet-choice'
import type { BetSlip } from '@models/bets/bet-slip'
import type { GameOdds } from '@models/games/game-odds'

export const updateBetSlip = (
  _betSlips: unknown[],
  _gameOdds: unknown,
  _selectedChoice: unknown,
): BetSlip[] => {
  /**
   * TODO: not yet implemented
   * - don't worry about that for now
   * - it will be responsible for updating the betsSlip array with the new bet
   */
  return []
}

export const getOddsFrom = (gameOdds: GameOdds, betChoice: BetChoice) => {
  switch (betChoice) {
    case 'TEAM_1_WINS':
      return gameOdds.oddsTeam1
    case 'TEAM_2_WINS':
      return gameOdds.oddsTeam2
    default:
      return gameOdds.oddsDraw
  }
}
