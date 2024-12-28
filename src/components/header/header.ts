import { staticImplements } from '@util/decorators.helper.'
import { WebComponent, type WebComponentConstructor } from '@util/web-component'
import { html } from 'common-tags'
import css from './header.scss?inline'

@staticImplements<WebComponentConstructor>()
export class Header extends WebComponent {
  static register() {
    WebComponent.register('arl-header', Header)
  }

  buildTemplate() {
    return html`
      <style>${css}</style>
      <div id="header">
        <h3 class="header__title">Web Components Bets Application</h3>
      </div>
    `
  }
}
