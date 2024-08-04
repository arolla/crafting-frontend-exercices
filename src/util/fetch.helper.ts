import type { GameApiResponse } from '@models/api/game-api-response'
import type { OddsApiResponse } from '@models/api/odds-api-response'
import { withDelay } from './helper'

export const fetchGames = (options?: { delay?: number }): Promise<
  GameApiResponse[]
> => {
  const { delay = 300 } = options ?? {}
  const loadGames = async () => {
    const { games } = await fetchJson<{ games: GameApiResponse[] }>(
      'http://localhost:3000/api/games',
    )
    return games
  }
  return withDelay(loadGames, delay)
}

export const fetchOdds = (options?: { delay?: number }): Promise<
  OddsApiResponse[]
> => {
  const { delay = 300 } = options ?? {}
  const loadOdds = async () => {
    const { odds }: { odds: OddsApiResponse[] } = await fetchJson(
      'http://localhost:3000/api/odds',
    )
    return odds
  }
  return withDelay(loadOdds, delay)
}

export const fetchJson = async <T>(
  input: string | URL | globalThis.Request,
  init?: RequestInit,
): Promise<T> => {
  const response = await fetch(input, init)
  const data: T = await response.json()
  return data
}
