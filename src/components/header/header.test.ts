import { beforeAll, describe, expect, it } from '@jest/globals'
import { render } from '../../utils/test.helper'
import { Header } from './header'

describe('Header Component', () => {
  beforeAll(() => {
    Header.register()
  })
  it('should render "Web Components Bets Application"', () => {
    // When
    const header = render(Header)
    // Then
    expect(
      header.shadowRoot?.querySelector('.header__title')?.textContent,
    ).toBe('Bets - online sports betting')
  })
})
