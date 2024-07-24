/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GameApiResponse,  OddsApiResponse } from '../models/api'

//let's build a new structure for the response from the api responses
export function mapResponseToGameOdds(games: GameApiResponse[], odds: OddsApiResponse[]): any[] {
    return games.map((game: GameApiResponse) => {
        const oddInfo = odds.find((odd: OddsApiResponse) => odd.gameId === game.id)!

        return {
            //todo
        }
    })
}
