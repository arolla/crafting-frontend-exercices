import { BettingList } from '@components/betting-list/betting-list'
import { Stake } from '@components/stake/stake'
import { Summary } from '@components/summary/summary'
import type { BetSlip } from '@models/bets/bet-slip'
import { UPDATE_BETS_SLIP, UPDATE_STAKE } from '@shared/constants/events'
import { staticImplements } from '@util/decorators.helper.'
import { WebComponent, type WebComponentConstructor } from '@util/web-component'
import { html } from 'common-tags'
import css from './betting-page.scss?inline'

@staticImplements<WebComponentConstructor>()
export class BettingPage extends WebComponent {
  static register() {
    WebComponent.register('arl-betting-page', BettingPage)
    BettingList.register()
    Stake.register()
    Summary.register()
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
        <arl-stake hidden></arl-stake>
        <arl-summary hidden></arl-summary>
      </div>
    `
  }

  async connectedCallback() {
    await super.connectedCallback()
    this.onEvent(UPDATE_BETS_SLIP, (value: { betsSlip: BetSlip[] }) => {
      this.updateBetsSlip(value.betsSlip)
    })
    this.onEvent(UPDATE_STAKE, (value: { stake: number }) => {
      this.updateStake(value.stake)
    })
  }

  updateBetsSlip(betsSlip: BetSlip[]) {
    const { shadowRoot } = this
    if (!shadowRoot) {
      return
    }
    const summary = shadowRoot.querySelector<Summary>('arl-summary')
    if (!summary) {
      return
    }
    this.#betsSlip = betsSlip
    summary.betsSlip = betsSlip
    this.toggleStakeRender()
    this.toggleSummaryRender()
  }

  updateStake(stake: number) {
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
