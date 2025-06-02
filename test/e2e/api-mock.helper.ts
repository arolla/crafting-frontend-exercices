import type { BrowserContext, Route } from 'playwright'

export const mockGamesRoute = (
  context: BrowserContext,
  mock: unknown,
): Promise<void> =>
  context.route('http://localhost:3000/api/games', (route: Route) => {
    void route.fulfill({
      status: 301,
      body: JSON.stringify(mock),
    })
  })

export const mockOddsRoute = (
  context: BrowserContext,
  mock: unknown,
): Promise<void> =>
  context.route('http://localhost:3000/api/odds', (route: Route) => {
    void route.fulfill({
      status: 301,
      body: JSON.stringify(mock),
    })
  })
