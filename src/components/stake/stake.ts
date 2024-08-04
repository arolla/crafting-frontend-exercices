import { html } from 'common-tags'
import { UPDATE_STAKE } from '../../shared/constants/events'
import {
  WebComponent,
  type WebComponentConstructor,
} from '../../utils/WebComponent'
import { staticImplements } from '../../utils/decorators'
import {
  attachShadow,
  createTemplateElement,
  defineCustomElement,
} from '../../utils/webComponents.helper'

@staticImplements<WebComponentConstructor>()
export class Stake extends WebComponent {
  static tag = 'arl-stake'

  static createTemplate = () => html`
    <div class="stake">
      <h3 class="stake__title">Your stake</h3>
      <div class="stake__input">
        <p>Choose your stake</p>
        <input type="number" value="" />
      </div>
    </div>
    `

  static register() {
    defineCustomElement(Stake)
  }

  constructor() {
    super()
    const template = createTemplateElement(Stake)
    attachShadow(this, template)
    this.shadowRoot
      ?.querySelector('input')
      ?.addEventListener('keyup', this.emitStake.bind(this))
  }

  emitStake() {
    const stake = this.shadowRoot?.querySelector('input')?.value
    window.dispatchEvent(new CustomEvent(UPDATE_STAKE, { detail: { stake } }))
  }
}
