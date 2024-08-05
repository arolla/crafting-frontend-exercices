import { updateBetsSlip } from '../../services/bets-slip/updateBetsSlip'
import '../betting-item/betting-item'
import { html } from 'common-tags'
import type { BetChoice } from '../../models/bets/betChoice'
import {
  SELECT_BET_CHOICE,
  UPDATE_BETS_SLIP,
} from '../../shared/constants/events'
import { CustomWebComponent } from '../../utils/CustomWebComponent'
import type { WebComponentConstructor } from '../../utils/WebComponent'
import { staticImplements } from '../../utils/decorators'
import {
  attachShadow,
  createTemplateElement,
} from '../../utils/webComponents.helper'
import css from './betting-list.scss'

@staticImplements<WebComponentConstructor>()
export class BettingList extends CustomWebComponent {
  static tag = 'arl-betting-list'

  // You'll need to update this template to pass the betting-item component attribute
  static createTemplate = (_gameOddsList: unknown[]) => html`
      <style>${css}</style>
      <div class="betting-list">
        <h3>List of bets - Football</h3>
        <arl-betting-item></arl-betting-item>
      </div>
    `

  static register() {
    customElements.define(BettingList.tag, BettingList)
  }

  betsSlip: unknown[] = [] // This is the data you'll receive from the SELECT_BET_CHOICE event (aka "click on a button" in child list item)

  constructor() {
    super()
    const template = createTemplateElement(BettingList, false)
    attachShadow(this, template)
  }

  connectedCallback() {
    window.addEventListener(
      SELECT_BET_CHOICE,
      this.onSelectBetChoice.bind(this),
    )
    // fetch data from back
    //const gameOddsList: Any[] = await fetchGameOdds()
    // and use it in the template to feed each child component with data
    this.render([])
  }

  onSelectBetChoice(event: Event) {
    const { gameOdds, betChoice } = (event as CustomEvent).detail
    this.selectBetSlip(gameOdds, betChoice)
  }

  render(_gameOddsList: unknown[]) {
    const newTemplate = BettingList.createTemplate([])
    this.renderComponent(newTemplate)
  }

  selectBetSlip(gameOdds: unknown, betChoice: BetChoice) {
    this.betsSlip = updateBetsSlip(this.betsSlip, gameOdds, betChoice)
    window.dispatchEvent(
      new CustomEvent(UPDATE_BETS_SLIP, {
        detail: { betsSlip: this.betsSlip },
      }),
    )
  }
}
