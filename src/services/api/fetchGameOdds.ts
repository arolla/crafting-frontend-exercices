import { mapResponseToGameOdds } from '../../mappers/mapResponseGameOdds'
import type { GameApiResponse } from '../../models/api/gameApiResponse'
import type { OddsApiResponse } from '../../models/api/oddsApiResponse'
import { mockFetch } from '../../utils/mockFetch'

// Change the return type of the function to Promise<any[]>
export const fetchGameOdds = async (): Promise<unknown[]> => {
  const gameList = await mockFetch<GameApiResponse>('games')
  const oddsList = await mockFetch<OddsApiResponse>('odds')
  return mapResponseToGameOdds(gameList, oddsList)
}
