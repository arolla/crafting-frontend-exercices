import { BettingList } from '@components/betting-list/betting-list'
import type { BetSlip } from '@models/bets/bet-slip'
import { UPDATE_BETS_SLIP, UPDATE_STAKE } from '@shared/constants/events'
import { staticImplements } from '@util/decorators.helper.'
import {
  WebComponent,
  type WebComponentConstructor,
  registerWebComponent,
} from '@util/web-component'
import { html } from 'common-tags'
import css from './betting-page.scss?inline'

@staticImplements<WebComponentConstructor>()
export class BettingPage extends WebComponent {
  static register() {
    registerWebComponent('arl-betting-page', BettingPage)
    BettingList.register()
  }

  #betsSlip: BetSlip[] = []
  #stake = 0

  get betsSlip() {
    return this.#betsSlip
  }

  get stake() {
    return this.#stake
  }

  buildTemplate() {
    return html`
      <style>${css}</style>
      <div class="betting-page">
        <arl-betting-list></arl-betting-list>
      </div>
    `
  }

  async connectedCallback() {
    await super.connectedCallback()
    window.addEventListener(UPDATE_BETS_SLIP, (event: Event) => {
      this.updateBetsSlip(event as CustomEvent)
    })
    window.addEventListener(UPDATE_STAKE, (event: Event) => {
      this.updateStake(event as CustomEvent)
    })
  }

  updateBetsSlip(event: CustomEvent<{ betsSlip: BetSlip[] }>) {
    const { shadowRoot } = this
    if (!shadowRoot) {
      return
    }
    const summary = shadowRoot.querySelector<Summary>('arl-summary')
    if (!summary) {
      return
    }
    const { betsSlip } = event.detail
    this.#betsSlip = betsSlip
    summary.betsSlip = betsSlip
    this.toggleStakeRender()
    this.toggleSummaryRender()
  }

  updateStake(event: CustomEvent<{ stake: number }>) {
    const { stake } = event.detail
    this.#stake = stake
    const summary = this.shadowRoot?.querySelector<Summary>('arl-summary')
    summary?.setAttribute('stake', `${stake}`)
    this.toggleSummaryRender()
  }

  toggleStakeRender() {
    const shouldDisplay = this.betsSlip.length > 0
    this.toggleDisplay('arl-stake', shouldDisplay)
  }

  toggleSummaryRender() {
    const shouldDisplay = this.stake > 0 && this.betsSlip.length > 0
    this.toggleDisplay('arl-summary', shouldDisplay)
    this.toggleDisplay('button', shouldDisplay)
  }
}
