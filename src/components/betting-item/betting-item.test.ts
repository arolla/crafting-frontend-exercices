import { BettingItem } from '@components/betting-item/betting-item'
import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals'
import type { GameApiResponse } from '@models/api/game-api-response'
import type { OddsApiResponse } from '@models/api/odds-api-response'
import type { GameOdds } from '@models/games/game-odds'
import { gamesApiResponse } from '../../api/games.response'
import { oddsApiResponse } from '../../api/odds.response'

describe('Components', () => {
  describe('BettingItem', () => {
    let bettingItem: BettingItem
    let gameOddsList: GameOdds[]
    let fetchGamesFake: (options?: { delay?: number }) => Promise<
      GameApiResponse[]
    >
    let fetchOddsFake: (options?: { delay?: number }) => Promise<
      OddsApiResponse[]
    >
    let fetchGameOdds: (options?: { delay?: number }) => Promise<GameOdds[]>
    beforeAll(async () => {
      fetchGamesFake = async () => {
        const { games } = gamesApiResponse
        return games
      }
      fetchOddsFake = async () => {
        const { odds } = oddsApiResponse
        return odds
      }
      jest.doMock('@util/fetch.helper', () => ({
        fetchGames: fetchGamesFake,
        fetchOdds: fetchOddsFake,
      }))
      fetchGameOdds = (await import('@services/api/fetch-game-odds'))
        .fetchGameOdds
      gameOddsList = await fetchGameOdds({ delay: 0 })
      BettingItem.register()
    })
    beforeEach(() => {
      jest.resetAllMocks()
      bettingItem = new BettingItem()
    })
    afterAll(() => {
      jest.restoreAllMocks()
    })
    describe('render', () => {
      test('should render component with unselected odds buttons', async () => {
        // Given
        bettingItem.gameOdds = gameOddsList[0]
        // When
        bettingItem.render()
        // Then
        const selectedButtons = bettingItem.shadowRoot?.querySelectorAll(
          '.betting-item__odds button.selected',
        )
        expect(selectedButtons?.length).toBe(0)
      })
    })
    describe('button click', () => {
      test.skip('should test something', () => {
        //TODO write the component tests here
        throw new Error('Not yet implementes!')
      })
    })
  })
})
