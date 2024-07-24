import { mapResponseToGameOdds } from '../../mappers'
import { GameApiResponse,  OddsApiResponse } from '../../models/api'
import { mockFetch } from '../../utils'

//change the return type of the function to Promise<any[]>
export const fetchGameOdds = async (): Promise<any[]> => {
    const gameList = await mockFetch('games') as GameApiResponse[]
    const oddsList = await mockFetch('odds') as OddsApiResponse[]

    return mapResponseToGameOdds(gameList, oddsList)
}
