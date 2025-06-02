import type { BetChoice } from '@models/bets/bet-choice'
import type { BetSlip } from '@models/bets/bet-slip'
import type { GameOdds } from '@models/games/game-odds'

export const updateBetSlip = (
  betSlips: BetSlip[],
  gameOdds: GameOdds,
  selectedChoice: BetChoice,
): BetSlip[] => {
  const betSlip: BetSlip = {
    gameId: gameOdds.gameId,
    selectedChoice,
    selectedOdds: getOddsFrom(gameOdds, selectedChoice),
  }
  const existingBetSlipIndex = betSlips.findIndex(
    ({ gameId }) => gameId === gameOdds.gameId,
  )
  if (existingBetSlipIndex < 0) {
    return betSlips.concat(betSlip)
  }
  const updatedBetSlips = Array.from(betSlips)
  updatedBetSlips[existingBetSlipIndex] = betSlip
  return updatedBetSlips
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
