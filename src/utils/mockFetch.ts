/**
 * DO NOT TOUCH THIS FILE
 */

import type { GameApiResponse } from '../models/api/gameApiResponse'
import type { OddsApiResponse } from '../models/api/oddsApiResponse'

/**
 * Allow you to simulate a fake API call
 * @param endpoint 'games' or 'odds'
 */
export const mockFetch = async <
  T extends GameApiResponse | OddsApiResponse,
  R = T extends GameApiResponse ? GameApiResponse : OddsApiResponse,
>(
  endpoint: string,
): Promise<R[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      if (endpoint.includes('games')) {
        const { games } = await retrieveDataFrom<{ games: R[] }>(
          'http://localhost:3000/api/games.json',
        )
        resolve(games)
        return
      }
      if (endpoint.includes('odds')) {
        const { odds } = await retrieveDataFrom<{ odds: R[] }>(
          'http://localhost:3000/api/odds.json',
        )
        resolve(odds)
        return
      }
      reject('Error: Unable to call endpoint..')
    }, 300)
  })
}

const retrieveDataFrom = async <T = Record<string, unknown>>(
  url: string,
): Promise<T> => {
  const response = await fetch(url)
  return response.json()
}
