import { BetChoice, BetSlip, GameOdds } from '../../models'
import { fetchGameOdds, updateBetsSlip } from '../../services'

import '../betting-item/betting-item'
import { SELECT_BET_CHOICE, UPDATE_BETS_SLIP } from '../../shared'
import css from './betting-list.scss'
import { CustomHTMLElement } from '../../utils'

const template = document.createElement('template')

function createTemplate(gameOddsList: GameOdds[]) {
  return `
    <style>${css}</style>
    <div class="betting-list">
        <h3>Liste des paris - Football</h3>
        ${gameOddsList
      .map((gameOdds: GameOdds) => `<arl-betting-item game-odds='${JSON.stringify(gameOdds)}'></arl-betting-item>`)
      .join('')
    }
    </div>
  `
}

export class BettingList extends CustomHTMLElement {
  betsSlip: BetSlip[] = []

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }

  async connectedCallback() {
    window.addEventListener(SELECT_BET_CHOICE, this.onSelectBetChoice.bind(this))

    const gameOddsList: GameOdds[] = await fetchGameOdds()
    this.render(gameOddsList)
  }

  render(gameOddsList: GameOdds[]) {
    const newTemplate = createTemplate(gameOddsList)
    this.renderComponent(newTemplate)
  }

  onSelectBetChoice(event: Event) {
    const { gameOdds, betChoice } = (event as CustomEvent).detail
    this.selectBetSlip(gameOdds, betChoice)
  }

  selectBetSlip(gameOdds: GameOdds, betChoice: BetChoice) {
    this.betsSlip = updateBetsSlip(this.betsSlip, gameOdds, betChoice)
    window.dispatchEvent(new CustomEvent(UPDATE_BETS_SLIP, { detail: { betsSlip: this.betsSlip } }))
  }
}

customElements.define('arl-betting-list', BettingList)
