import { toGameOdds } from '@mappers/game-odds.mapper'
import type { GameOdds } from '@models/games/game-odds'
import { fetchGames, fetchOdds } from '@util/fetch.helper'

export const fetchGameOdds = async (options?: { delay?: number }): Promise<
  GameOdds[]
> => toGameOdds(await fetchGames(options), await fetchOdds(options))
