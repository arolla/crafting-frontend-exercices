import { CustomHTMLElement } from '../../utils'
import { fetchGameOdds, updateBetsSlip } from '../../services'

import '../betting-item/betting-item'
import Any = jasmine.Any
import { BetChoice } from '../../models'
import { SELECT_BET_CHOICE, UPDATE_BETS_SLIP } from '../../shared'
import css from './betting-list.scss'

const template = document.createElement('template')

//you'll need to update this template to pass the betting-item component attribute
function createTemplate(gameOddsList: Any[]) {
  return `
    <style>${css}</style>
    <div class="betting-list">
        <h3>List of bets - Football</h3>
        <arl-betting-item></arl-betting-item>
    </div>
  `
}

export class BettingList extends CustomHTMLElement {
  betsSlip: Any[] = [] //this is the data you'll receive from the SELECT_BET_CHOICE event (aka "click on a button" in child list item)

  constructor() {
    super()

    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true),
    )
  }

  async connectedCallback() {

    window.addEventListener(SELECT_BET_CHOICE, this.onSelectBetChoice.bind(this))
    // fetch data from back
    //const gameOddsList: Any[] = await fetchGameOdds()
    // and use it in the template to feed each child component with data
    this.render([])
  }

  render(gameOddsList: Any[]) {
    const newTemplate = createTemplate([])
    this.renderComponent(newTemplate)
  }

  onSelectBetChoice(event: Event) {
    const { gameOdds, betChoice } = (event as CustomEvent).detail
    this.selectBetSlip(gameOdds, betChoice)
  }

  selectBetSlip(gameOdds: Any, betChoice: BetChoice) {
    this.betsSlip = updateBetsSlip(this.betsSlip, gameOdds, betChoice)
    window.dispatchEvent(new CustomEvent(UPDATE_BETS_SLIP, { detail: { betsSlip: this.betsSlip } }))
  }
}

customElements.define('arl-betting-list', BettingList)
