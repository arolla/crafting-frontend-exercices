import { UPDATE_STAKE } from '@shared/constants/events'
import { staticImplements } from '@util/decorators.helper.'
import { parseNumber } from '@util/string.helper'
import { WebComponent, type WebComponentConstructor } from '@util/web-component'
import { html } from 'common-tags'
import css from './stake.scss?inline'

@staticImplements<WebComponentConstructor>()
export class Stake extends WebComponent {
  static register() {
    WebComponent.register('arl-stake', Stake)
  }

  buildTemplate() {
    return html`
      <style>${css}</style>
      <div class="stake">
        <h3 class="stake__title">Your stake</h3>
        <div class="stake__input">
          <p>Choose your stake</p>
          <input type="number" value="" />
        </div>
      </div>
    `
  }

  render() {
    super.render()
    this.shadowRoot?.querySelector('input')?.addEventListener('keyup', () => {
      this.handleStakeChange()
    })
  }

  handleStakeChange() {
    const inputElt = this.shadowRoot?.querySelector('input')
    if (!inputElt) {
      return
    }
    const stake = parseNumber(inputElt.value)
    this.sendEvent(UPDATE_STAKE, { stake })
  }
}
