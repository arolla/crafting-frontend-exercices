import { test } from '@playwright/test'
import { mockGamesRoute, mockOddsRoute } from './api-mock.helper'
import {
  mockedApiGamesResponse,
  mockedApiOddsResponse,
} from './api-mock.response'
import { PlaywrightBettingPage } from './playwright-betting-page'

test.describe(
  'Betting page',
  {
    tag: '@betting-page',
  },
  () => {
    let bettingPage: PlaywrightBettingPage
    test.beforeEach(async ({ page, context }) => {
      await mockGamesRoute(context, mockedApiGamesResponse)
      await mockOddsRoute(context, mockedApiOddsResponse)
      bettingPage = new PlaywrightBettingPage(
        page,
        mockedApiGamesResponse.games,
      )
      await bettingPage.load()
    })
    test('should render betting page', async ({ page }) => {
      // Then
      await bettingPage.expectPageLoaded()
    })
  },
)
