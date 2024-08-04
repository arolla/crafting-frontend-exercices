import type { GameApiResponse } from '@models/api/game-api-response'
import type { OddsApiResponse } from '@models/api/odds-api-response'
import type { GameOdds } from '@models/games/game-odds'

export const toGameOdds = (
  games: GameApiResponse[],
  odds: OddsApiResponse[],
): GameOdds[] =>
  games.map(({ id, team1, team2 }) => {
    const chance = odds.find(({ gameId }) => gameId === id)
    if (!chance) {
      throw new Error('No odds matching game')
    }
    const { gameId, oddsDraw, oddsTeam1, oddsTeam2 } = chance
    return {
      gameId,
      oddsDraw,
      oddsTeam1,
      oddsTeam2,
      team1,
      team2,
    }
  })
