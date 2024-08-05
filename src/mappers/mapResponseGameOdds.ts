import type { GameApiResponse } from '../models/api/gameApiResponse'
import type { OddsApiResponse } from '../models/api/oddsApiResponse'

// Let's build a new structure for the response from the api responses
export const mapResponseToGameOdds = (
  games: GameApiResponse[],
  odds: OddsApiResponse[],
): unknown[] => {
  return games.map((game: GameApiResponse) => {
    const _oddInfo = odds.find((odd: OddsApiResponse) => odd.gameId === game.id)
    return {
      // TODO
    }
  })
}
