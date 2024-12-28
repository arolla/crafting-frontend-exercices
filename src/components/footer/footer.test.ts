import Footer from './footer'

describe('Components', () => {
  describe('Footer', () => {
    beforeAll(() => {
      Footer.register()
    })
    test('should provide a "Log in" link given user is NOT logged in', () => {
      // Given
      const footer = new Footer()
      footer.render()
      // When
      footer.setAttribute('is-user-logged-in', 'false')
      // Then
      expect(footer.shadowRoot).toBeTruthy()
      expect(footer.shadowRoot?.querySelector('#footer')).toMatchSnapshot()
    })
    test('should provide a "Log out" link given user is logged in', () => {
      // Given
      const footer = new Footer()
      footer.render()
      // When
      footer.setAttribute('is-user-logged-in', 'true')
      // Then
      expect(footer.shadowRoot).toBeTruthy()
      expect(footer.shadowRoot?.querySelector('#footer')).toMatchSnapshot()
    })
  })
})
