import { html } from 'common-tags'
import css from './footer.scss?inline'

import { staticImplements } from '@util/decorators.helper.'
import { WebComponent, type WebComponentConstructor } from '@util/web-component'

@staticImplements<WebComponentConstructor>()
export class Footer extends WebComponent {
  static register() {
    WebComponent.register('arl-footer', Footer)
  }

  static get observedAttributes() {
    return ['is-user-logged-in']
  }

  userLoggedIn = false

  get text(): string {
    return `Contact | Map | ${this.userLoggedIn ? 'Log out' : 'Log in'}`
  }

  buildTemplate() {
    return html`
      <style>${css}</style>
      <div id="footer">
        <h3>Need help?</h3>
        <p>${this.text}</p>
      </div>
    `
  }

  attributeChangedCallback(
    attributeTagName: string,
    _formerValue: string,
    newValue: string,
  ) {
    if (attributeTagName === 'is-user-logged-in') {
      this.userLoggedIn = newValue === 'true'
      this.render()
    }
  }
}
