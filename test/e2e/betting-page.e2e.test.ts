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
    test('should render stake given the user clicks on "team2"', async ({
      page,
    }) => {
      // Given
      await bettingPage.expectPageLoaded()
      // When
      await bettingPage.clickTeamButton('team2')
      // Then
      await bettingPage.expectStake({ visible: true })
    })
    test('should render summary given the user sets stake', async ({
      page,
    }) => {
      // Given
      await bettingPage.expectPageLoaded()
      await bettingPage.clickTeamButton('team2')
      await bettingPage.expectStake({ visible: true })
      // When
      await bettingPage.setStake(100)
      // Then
      await bettingPage.expectSummary({
        text: 'Number of bets placed: 1 Potential gain: 50 €',
        visible: true,
      })
    })
    test('should update summary given the user clicks on "team3"', async ({
      page,
    }) => {
      // Given
      await bettingPage.expectPageLoaded()
      await bettingPage.clickTeamButton('team2')
      await bettingPage.expectStake({ visible: true })
      await bettingPage.setStake(100)
      await bettingPage.expectSummary({
        text: 'Number of bets placed: 1 Potential gain: 50 €',
        visible: true,
      })
      // When
      await bettingPage.clickTeamButton('team3')
      // Then
      await bettingPage.expectSummary({
        text: 'Number of bets placed: 2 Potential gain: 114 €',
        visible: true,
      })
    })
    test('should update summary given the user change stake', async ({
      page,
    }) => {
      // Given
      await bettingPage.expectPageLoaded()
      await bettingPage.clickTeamButton('team2')
      await bettingPage.expectStake({ visible: true })
      await bettingPage.setStake(100)
      await bettingPage.expectSummary({
        text: 'Number of bets placed: 1 Potential gain: 50 €',
        visible: true,
      })
      await bettingPage.clickTeamButton('team3')
      await bettingPage.expectSummary({
        text: 'Number of bets placed: 2 Potential gain: 114 €',
        visible: true,
      })
      // When
      await bettingPage.setStake(200)
      // Then
      await bettingPage.expectSummary({
        text: 'Number of bets placed: 2 Potential gain: 229 €',
        visible: true,
      })
    })
  },
)
