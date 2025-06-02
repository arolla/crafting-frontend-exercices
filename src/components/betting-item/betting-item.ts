import betIcon from '@assets/bet.png'
import type { BetChoice } from '@models/bets/bet-choice'
// import type { GameOdds } from '@models/games/game-odds'
import { DRAW, TEAM_1_WINS, TEAM_2_WINS } from '@shared/constants/bet-choice'
// import { SELECT_BET_CHOICE } from '@shared/constants/events'
import { staticImplements } from '@util/decorators.helper.'
import { WebComponent, type WebComponentConstructor } from '@util/web-component'
import { html } from 'common-tags'
import css from './betting-item.scss?inline'

@staticImplements<WebComponentConstructor>()
export class BettingItem extends WebComponent {
  static register() {
    WebComponent.register('arl-betting-item', BettingItem)
  }

  // TODO: could you find a better type for this?
  #gameOdds: unknown | null = null

  /**
   * TODO:
   *   - data is hard coded for now, could you find a better model ?
   *   - see fetchGameOdds in src/services/api/fetchGameOdds.ts to help you
   */
  buildTemplate() {
    return html`
      <style>${css}</style>
      <div class="betting-item">
        <div class="betting-item__teams">
          <img src="${betIcon}" alt="Sport icon" />
          <p>
            <span class="betting-item__teams--name">team 1</span> -
            <span class="betting-item__teams--name">team 2</span>
          </p>
        </div>
        <div class="betting-item__odds">
          <button>
            <span class="betting-item__odds--name">team 1</span>
            <span class="betting-item__odds--number">1.20</span>
          </button>
          <button>
            <span class="betting-item__odds--name">Draw</span>
            <span class="betting-item__odds--number">2.42</span>
          </button>
          <button>
            <span class="betting-item__odds--name">team 2</span>
            <span class="betting-item__odds--number">1.78</span>
          </button>
        </div>
      </div>
    `
  }

  render() {
    super.render()
    this.addEventToButtons()
  }

  addEventToButtons() {
    const buttons = this.shadowRoot?.querySelectorAll(
      '.betting-item__odds button',
    )
    buttons?.forEach((button: Element, index: number) => {
      const betChoices: BetChoice[] = [TEAM_1_WINS, DRAW, TEAM_2_WINS]
      button.addEventListener('click', () =>
        this.handleSelectBet(button, betChoices[index]),
      )
    })
  }

  selectClickedButton(clickedButton: Element) {
    const buttons = this.shadowRoot?.querySelectorAll(
      '.betting-item__odds button',
    )
    if (!buttons) {
      return
    }
    for (const button of buttons) {
      if (button === clickedButton) {
        button.classList.add('selected')
      } else {
        button.classList.remove('selected')
      }
    }
  }

  handleSelectBet(buttonElement: Element, betChoice: BetChoice) {
    this.selectClickedButton(buttonElement)
    /**
     * TODO:
     *  - send an event with your bet ('TEAM_1_WINS' | 'DRAW' | 'TEAM_2_WINS') and odds each time you click on a button
     *  - it can be used by betting list component
     */
  }
}
