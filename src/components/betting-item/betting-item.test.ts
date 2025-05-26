import { gamesApiResponse } from '@api/games.response'
import { oddsApiResponse } from '@api/odds.response'
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
      let dispatchEventSpy: jest.SpiedFunction<typeof window.dispatchEvent>
      beforeAll(() => {
        dispatchEventSpy = jest.spyOn(window, 'dispatchEvent')
      })
      test('should select odds button "Team1 1.52" when user clicks on it', () => {
        // Given
        bettingItem.gameOdds = gameOddsList[0]
        bettingItem.render()
        const firstOddsButton: HTMLButtonElement | null | undefined =
          bettingItem.shadowRoot?.querySelector(
            'div.betting-item__odds > button:nth-child(1)',
          )
        if (!firstOddsButton) {
          throw new Error('No first odds button')
        }
        // When
        firstOddsButton.click()
        // Then
        expect(firstOddsButton?.classList.contains('selected')).toBeTruthy()
      })
      test('should unselect other buttons and select odds button "Draw 3.45" when user clicks on it', () => {
        // Given
        bettingItem.gameOdds = gameOddsList[0]
        bettingItem.render()
        const buttons: NodeListOf<HTMLButtonElement> | undefined =
          bettingItem.shadowRoot?.querySelectorAll('.betting-item__odds button')
        const firstButton = buttons?.[0]
        if (!firstButton) {
          throw new Error('No first button')
        }
        const secondButton = buttons?.[1]
        if (!secondButton) {
          throw new Error('No second button')
        }
        // When
        firstButton.click() // Click on the first button
        secondButton.click() // Update by clicking on the second button
        // Then
        expect(firstButton.classList.contains('selected')).toBeFalsy()
        expect(secondButton.classList.contains('selected')).toBeTruthy()
      })
      test('should emit a valid bet slip when user clicks on the odds button', () => {
        // Given
        bettingItem.gameOdds = gameOddsList[0]
        bettingItem.render()
        const firstOddsButton: HTMLButtonElement | null | undefined =
          bettingItem.shadowRoot?.querySelector(
            '.betting-item__odds button:first-child',
          )
        if (!firstOddsButton) {
          throw new Error('No first odds button')
        }
        const expectedCustomEventDetail = {
          betChoice: 'TEAM_1_WINS',
          gameOdds: {
            gameId: '1',
            oddsDraw: 2.18,
            oddsTeam1: 1.24,
            oddsTeam2: 2.57,
            team1: 'Manchester City',
            team2: 'Arsenal',
          },
        }
        // When
        firstOddsButton.click()
        // Then
        expect(dispatchEventSpy).toHaveBeenCalledTimes(1)
        expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(CustomEvent))
        const customEvent = dispatchEventSpy.mock.calls[0][0] as CustomEvent
        expect(customEvent.detail).toStrictEqual(expectedCustomEventDetail)
      })
    })
  })
})
