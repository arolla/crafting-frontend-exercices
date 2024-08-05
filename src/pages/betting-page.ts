import { html } from 'common-tags'
import { BettingList } from '../components/betting-list/betting-list'
import {
  WebComponent,
  type WebComponentConstructor,
} from '../utils/WebComponent'
import { staticImplements } from '../utils/decorators'
import {
  attachShadow,
  createTemplateElement,
  defineCustomElement,
} from '../utils/webComponents.helper'
import css from './betting-page.scss'

@staticImplements<WebComponentConstructor>()
export class BettingPage extends WebComponent {
  static tag = 'arl-betting-page'

  static createTemplate = () => html`
      <style>${css}</style>
      <div class="betting-page">
        <arl-betting-list></arl-betting-list>
      </div>
    `
  static register() {
    defineCustomElement(BettingPage)
  }

  constructor() {
    super()
    const template = createTemplateElement(BettingPage)
    attachShadow(this, template)
    BettingList.register()
  }
}
