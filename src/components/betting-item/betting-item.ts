import betIcon from '@assets/bet.png'
import type { BetChoice } from '@models/bets/bet-choice'
import type { GameOdds } from '@models/games/game-odds'
import { DRAW, TEAM_1_WINS, TEAM_2_WINS } from '@shared/constants/bet-choice'
import { SELECT_BET_CHOICE } from '@shared/constants/events'
import { staticImplements } from '@util/decorators.helper.'
import { WebComponent, type WebComponentConstructor } from '@util/web-component'
import { html } from 'common-tags'
import css from './betting-item.scss?inline'

@staticImplements<WebComponentConstructor>()
export class BettingItem extends WebComponent {
  static register() {
    WebComponent.register('arl-betting-item', BettingItem)
  }

  #gameOdds: GameOdds | null = null

  get gameOdds(): GameOdds | null {
    return this.#gameOdds
  }

  set gameOdds(gameOdds: GameOdds) {
    this.#gameOdds = gameOdds
    this.render()
  }

  buildTemplate() {
    if (!this.gameOdds) {
      return ''
    }
    return html`
      <style>${css}</style>
      <div class="betting-item">
        <div class="betting-item__teams">
          <img src="${betIcon}" alt="Sport icon" />
          <p>
            <span class="betting-item__teams--name">${this.gameOdds?.team1}</span> -
            <span class="betting-item__teams--name">${this.gameOdds?.team2}</span>
          </p>
        </div>
        <div class="betting-item__odds">
          <button>
            <span class="betting-item__odds--name">${this.gameOdds?.team1}</span>
            <span class="betting-item__odds--number">${this.gameOdds?.oddsTeam1}</span>
          </button>
          <button>
            <span class="betting-item__odds--name">Draw</span>
            <span class="betting-item__odds--number">${this.gameOdds?.oddsDraw}</span>
          </button>
          <button>
            <span class="betting-item__odds--name">${this.gameOdds?.team2}</span>
            <span class="betting-item__odds--number">${this.gameOdds?.oddsTeam2}</span>
          </button>
        </div>
      </div>
    `
  }

  render() {
    super.render()
    this.addButtonHandlers()
  }

  addButtonHandlers() {
    const buttons = this.shadowRoot?.querySelectorAll(
      '.betting-item__odds button',
    )
    if (!buttons) {
      return
    }
    const betChoices: BetChoice[] = [TEAM_1_WINS, DRAW, TEAM_2_WINS]
    for (const [index, button] of buttons.entries()) {
      button.addEventListener('click', () =>
        this.handleBetChoice(button, betChoices[index]),
      )
    }
  }

  unselectButtons() {
    const buttons = this.shadowRoot?.querySelectorAll(
      '.betting-item__odds button',
    )
    if (!buttons) {
      return
    }
    for (const button of buttons) {
      button.classList.remove('selected')
    }
  }

  selectButton(button: Element) {
    this.unselectButtons()
    button.classList.add('selected')
  }

  handleBetChoice(button: Element, betChoice: BetChoice) {
    this.selectButton(button)
    const { gameOdds } = this
    this.sendEvent(SELECT_BET_CHOICE, { gameOdds, betChoice })
  }
}
