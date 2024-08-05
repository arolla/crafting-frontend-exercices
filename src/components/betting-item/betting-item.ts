import { html } from 'common-tags'
import betIcon from '../../../assets/bet.png'
import type { BetChoice } from '../../models/bets/betChoice'
import {
  DRAW,
  TEAM_1_WINS,
  TEAM_2_WINS,
} from '../../shared/constants/betChoice'
import { SELECT_BET_CHOICE } from '../../shared/constants/events'
import { CustomWebComponent } from '../../utils/CustomWebComponent'
import type { WebComponentConstructor } from '../../utils/WebComponent'
import { staticImplements } from '../../utils/decorators'
import {
  attachShadow,
  createTemplateElement,
  defineCustomElement,
} from '../../utils/webComponents.helper'
import css from './footer.scss?inline'

@staticImplements<WebComponentConstructor>()
export class BettingItem extends CustomWebComponent {
  static tag = 'arl-betting-item'

  // Data is hard coded for now, could you find a better model ?
  // see fetchGameOdds in src/services/api/fetchGameOdds.ts to help you
  static createTemplate = (_gameOdds: unknown | null): string => html`
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

  // Indicates to observe the game-odds attribute values
  static get observedAttributes() {
    return ['game-odds']
  }

  static register() {
    defineCustomElement(BettingItem)
  }

  gameOdds: unknown | null = null // Could you find a better type for this?

  constructor() {
    super()
    const template = createTemplateElement(BettingItem, false)
    attachShadow(this, template)
    this.render()
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

  // INPUT (gameOdds)
  // Automatically called each time the game-odds attribute is updated
  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name !== 'game-odds') {
      return
    }
    this.gameOdds = JSON.parse(newValue)
    this.render()
  }

  connectedCallback() {
    this.render()
  }

  // OUTPUT
  // Send an event with your bet ('TEAM_1_WINS' | 'DRAW' | 'TEAM_2_WINS') and odds each time you click on a button
  // it can be used by betting list component
  handleSelectBet(buttonElement: Element, betChoice: BetChoice) {
    this.selectClickedButton(buttonElement)
    window.dispatchEvent(
      new CustomEvent(SELECT_BET_CHOICE, {
        detail: { gameOdds: this.gameOdds, betChoice },
      }),
    )
  }

  render(isUserLoggedIn?: string) {
    const footerText =
      isUserLoggedIn === 'true'
        ? 'Contact | Map | Log out'
        : 'Contact | Map | Log in'
    const newTemplate = BettingItem.createTemplate(footerText)
    this.renderComponent(newTemplate)
  }

  // Changing css class to show the selected button
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
}
