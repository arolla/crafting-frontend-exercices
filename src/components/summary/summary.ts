import { computePotentialGains } from '@business/business.rules'
import type { BetSlip } from '@models/bets/bet-slip'
import { staticImplements } from '@util/decorators.helper.'
import { parseNumber } from '@util/string.helper'
import { WebComponent, type WebComponentConstructor } from '@util/web-component'
import { html } from 'common-tags'
import css from './summary.scss?inline'

@staticImplements<WebComponentConstructor>()
export class Summary extends WebComponent {
  static register() {
    WebComponent.register('arl-summary', Summary)
  }

  #betsSlip: BetSlip[] = []
  #stake = 0

  get stake() {
    return this.#stake
  }

  get betsSlip() {
    return this.#betsSlip
  }

  set betsSlip(betsSlip: BetSlip[]) {
    this.#betsSlip = betsSlip
    this.render()
  }

  set stake(stake: number) {
    if (this.#stake === stake) {
      return
    }
    this.#stake = stake
    this.render()
  }

  buildTemplate() {
    if (!this.betsSlip.length) {
      return ''
    }
    const potentialGains = computePotentialGains(this.stake, this.betsSlip)
    return html`
      <style>${css}</style>
      <div class="summary">
        <h3 class="summary__title">Betting summary</h3>
        <div class="summary__info">
          <p class="summary__info--bets-slip">Number of bets placed: ${this.betsSlip.length}</p>
          <p class="summary__info--potential-gains">Potential gain: ${potentialGains} €</p>
        </div>
      </div>
    `
  }

  static get observedAttributes() {
    return ['stake']
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'stake': {
        const stake = parseNumber(newValue)
        if (this.stake !== stake) {
          this.#stake = stake
          this.render()
        }
        break
      }
      default:
    }
  }
}
