import { render } from '../../utils'
import { Footer } from './footer'

it('should return footer when user is logged in', () => {
  const footer = render(Footer)
  footer.setAttribute('is-user-logged-in', 'true')
  expect(footer.shadowRoot?.querySelector('#footer')).toMatchSnapshot()
})

it('should return footer when user is NOT logged in', async () => {
  const footer = render(Footer)
  footer.setAttribute('is-user-logged-in', 'false')
  expect(footer?.shadowRoot?.querySelector('#footer')).toMatchSnapshot()
})
