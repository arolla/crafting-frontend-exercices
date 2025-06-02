import { BettingItem } from '@components/betting-item/betting-item'
import type { BetChoice } from '@models/bets/bet-choice'
import type { BetSlip } from '@models/bets/bet-slip'
import type { GameOdds } from '@models/games/game-odds'
import { fetchGameOdds } from '@services/api/fetch-game-odds'
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

  #gameOddsList: GameOdds[] = []
  #betsSlip: BetSlip[] = []

  get gameOddsList() {
    return this.#gameOddsList
  }

  get betsSlip() {
    return this.#betsSlip
  }

  buildTemplate() {
    return html`
      <style>${css}</style>
      <div class="betting-list">
        <h3>List of bets - Football</h3>
        ${this.gameOddsList
          .map(
            (_, index) =>
              `<arl-betting-item id="bettingItem${index + 1}"></arl-betting-item>`,
          )
          .join('')}
      </div>
    `
  }

  async connectedCallback() {
    this.#gameOddsList = await fetchGameOdds()
    this.render()
    this.onEvent(
      SELECT_BET_CHOICE,
      (value: { gameOdds: GameOdds; betChoice: BetChoice }) => {
        const { gameOdds, betChoice } = value
        this.selectBetSlip(gameOdds, betChoice)
      },
    )
  }

  render() {
    const { shadowRoot } = this
    if (!shadowRoot) {
      return
    }
    super.render()
    for (const [index, gameOdds] of this.gameOddsList.entries()) {
      const bettingItemsElt = shadowRoot.querySelector<BettingItem>(
        `#bettingItem${index + 1}`,
      )
      if (bettingItemsElt) {
        bettingItemsElt.gameOdds = gameOdds
      }
    }
  }

  selectBetSlip(gameOdds: GameOdds, betChoice: BetChoice) {
    const betsSlip = updateBetSlip(this.betsSlip, gameOdds, betChoice)
    this.#betsSlip = betsSlip
    this.sendEvent(UPDATE_BETS_SLIP, { betsSlip })
  }
}
