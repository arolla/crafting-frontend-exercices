import type { GameApiResponse } from '@models/api/game-api-response'
import { expect } from '@playwright/test'
import type { Page } from 'playwright'

export class PlaywrightBettingPage {
  readonly #page: Page
  readonly #games: GameApiResponse[]

  readonly bettingItemSelector = 'arl-betting-item > .betting-item'
  readonly bettingListSelector = 'arl-betting-list > .betting-list'
  readonly footerSelector = 'arl-footer > #footer'
  readonly headerSelector = 'arl-header > #header'
  readonly stakeSelector = 'arl-stake > .stake'
  readonly summarySelector = 'arl-summary > .summary'

  get bettingItemsLocator() {
    return this.bettingListLocator.locator(this.bettingItemSelector)
  }

  get bettingListLocator() {
    return this.#page.locator(this.bettingListSelector)
  }

  get bettingListTitleLocator() {
    return this.bettingListLocator.getByRole('heading', {
      name: 'List of bets - Football',
    })
  }

  get footerLocator() {
    return this.#page.locator(this.footerSelector)
  }

  get footerTextLocator() {
    return this.footerLocator.getByText('Need help? Contact | Map | Log out')
  }

  get headerLocator() {
    return this.#page.locator(this.headerSelector)
  }

  get headerTitleLocator() {
    return this.headerLocator.getByRole('heading', {
      name: 'Web Components Bets Application',
    })
  }

  get stakeLocator() {
    return this.#page.locator(this.stakeSelector)
  }

  get stakeInputLocator() {
    return this.stakeLocator.getByRole('spinbutton')
  }

  get stakeInputTitleLocator() {
    return this.stakeLocator.getByText('Choose your stake')
  }

  get stakeTitleLocator() {
    return this.stakeLocator.getByRole('heading', { name: 'Your stake' })
  }

  get summaryLocator() {
    return this.#page.locator(this.summarySelector)
  }

  get summaryTitleLocator() {
    return this.summaryLocator.getByRole('heading', {
      name: 'Betting summary',
    })
  }

  constructor(page: Page, games: GameApiResponse[]) {
    this.#page = page
    this.#games = games
  }

  async clickTeamButton(name: string) {
    await this.#page.getByRole('button', { name }).click()
  }

  async expectPageLoaded() {
    await expect(this.bettingListTitleLocator).toBeVisible()
    await expect(this.bettingItemsLocator).toHaveCount(this.#games.length)
    for (const [index, game] of this.#games.entries()) {
      await expect(
        this.bettingItemsLocator
          .nth(index)
          .getByText(`${game.team1} - ${game.team2}`),
      ).toBeVisible()
    }
    await this.expectStake({ visible: false })
  }

  async expectStake({ visible }: { visible: boolean }) {
    if (!visible) {
      await expect(this.stakeTitleLocator).toBeHidden()
      await expect(this.stakeInputTitleLocator).toBeHidden()
      return
    }
    await expect(this.stakeTitleLocator).toBeVisible()
    await expect(this.stakeInputTitleLocator).toBeVisible()
  }

  async expectSummary({ text, visible }: { text: string; visible: boolean }) {
    if (!visible) {
      await expect(this.summaryLocator.getByText(text)).toBeHidden()
      return
    }
    await expect(this.summaryLocator.getByText(text)).toBeVisible()
  }

  async load() {
    await this.#page.goto('/')
    await expect(this.headerTitleLocator).toBeVisible()
    await expect(this.footerTextLocator).toBeVisible()
    await expect(this.stakeLocator).toBeHidden()
    await expect(this.summaryLocator).toBeHidden()
    await this.#page.waitForSelector(this.bettingItemSelector)
  }

  async setStake(value: number) {
    await this.stakeInputLocator.click()
    await this.stakeInputLocator.fill(`${value}`)
    await this.#page.keyboard.press('Enter')
    await expect(this.summaryTitleLocator).toBeVisible()
  }
}
