import { Header } from './header'

describe('Components', () => {
  describe('Header', () => {
    beforeAll(() => {
      Header.register()
    })
    test('should render "Web Components Bets Application"', async () => {
      // When
      const header = new Header()
      header.render()
      // Then
      expect(header.shadowRoot).toBeTruthy()
      expect(
        header.shadowRoot?.querySelector('.header__title')?.textContent,
      ).toBe('Web Components Bets Application')
    })
  })
})
