import { BettingItem } from '@components/betting-item/betting-item'
import type { BetChoice } from '@models/bets/bet-choice'
import type { GameOdds } from '@models/games/game-odds'
// import { fetchGameOdds } from '@services/api/fetch-game-odds'
import { updateBetSlip } from '@services/bets-slip/update-bet-slip'
import { SELECT_BET_CHOICE, UPDATE_BETS_SLIP } from '@shared/constants/events'
import { staticImplements } from '@util/decorators.helper.'
import { WebComponent, type WebComponentConstructor } from '@util/web-component'
import { html } from 'common-tags'
import css from './betting-list.scss?inline'

@staticImplements<WebComponentConstructor>()
export class BettingList extends WebComponent {
  static register() {
    WebComponent.register('arl-betting-list', BettingList)
    BettingItem.register()
  }

  // TODO: this is the data you'll receive from the SELECT_BET_CHOICE event (aka "click on a button" in child list item)
  #betsSlip: unknown[] = []

  get betsSlip() {
    return this.#betsSlip
  }

  // TODO: update this template to pass the betting-item component attribute
  buildTemplate() {
    return html`
      <style>${css}</style>
      <div class="betting-list">
        <h3>List of bets - Football</h3>
        <arl-betting-item></arl-betting-item>
      </div>
    `
  }

  async connectedCallback() {
    // this.#gameOddsList = await fetchGameOdds()
    this.render()
    window.addEventListener(SELECT_BET_CHOICE, (event: Event) =>
      this.onSelectBetChoice(event),
    )
  }

  render() {
    const { shadowRoot } = this
    if (!shadowRoot) {
      return
    }
    super.render()
    // TODO
  }

  onSelectBetChoice(event: Event) {
    if (!(event instanceof CustomEvent)) {
      return
    }
    const { gameOdds, betChoice } = event.detail
    this.selectBetSlip(gameOdds, betChoice)
  }

  selectBetSlip(gameOdds: GameOdds, betChoice: BetChoice) {
    const betsSlip = updateBetSlip(this.betsSlip, gameOdds, betChoice)
    this.#betsSlip = betsSlip
    window.dispatchEvent(
      new CustomEvent(UPDATE_BETS_SLIP, {
        detail: { betsSlip },
      }),
    )
  }
}
