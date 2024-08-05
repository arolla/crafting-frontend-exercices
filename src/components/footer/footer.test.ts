import { beforeAll, describe, expect, it } from '@jest/globals'
import { render } from '../../utils/test.helper'
import { Footer } from './footer'

describe('Footer Component', () => {
  beforeAll(() => {
    Footer.register()
  })
  it('should provide a "log in" link given user is NOT logged in', () => {
    // Given
    const footer = render(Footer)
    // When
    footer.setAttribute('is-user-logged-in', 'false')
    // Then
    expect(footer?.shadowRoot?.querySelector('#footer')).toMatchSnapshot()
  })
  it('should provide a "log out" link given user is logged in', () => {
    // Given
    const footer = render(Footer)
    // When
    footer.setAttribute('is-user-logged-in', 'true')
    // Then
    expect(footer.shadowRoot?.querySelector('#footer')).toMatchSnapshot()
  })
})
