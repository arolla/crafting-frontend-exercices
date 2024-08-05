import { html } from 'common-tags'
import type { WebComponentConstructor } from '../../utils/WebComponent'
import { staticImplements } from '../../utils/decorators'
import {
  attachShadow,
  createTemplateElement,
  defineCustomElement,
} from '../../utils/webComponents.helper'
import css from './header.scss?inline'

@staticImplements<WebComponentConstructor>()
export class Header extends HTMLElement {
  static tag = 'arl-header'

  static createTemplate = () => html`
    <style>${css}</style>
    <div id="header">
      <h3 class="header__title">Bets - online sports betting</h3>
    </div>
  `

  static register() {
    defineCustomElement(Header)
  }

  constructor() {
    super()
    const template = createTemplateElement(Header)
    attachShadow(this, template)
  }
}
