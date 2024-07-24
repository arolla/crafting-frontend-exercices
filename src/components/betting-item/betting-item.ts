import css from './betting-item.scss'
import betIcon from '../../../assets/bet.png'
import { BetChoice } from '../../models'
import { DRAW, SELECT_BET_CHOICE, TEAM_1_WINS, TEAM_2_WINS } from '../../shared'
import { CustomHTMLElement } from '../../utils'

const template = document.createElement('template')

// data is hard coded for now, could you find a better model ?
// see fetchGameOdds in src/services/api/fetchGameOdds.ts to help you
function createTemplate(gameOdds: unknown | null) {
  return `
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

export class BettingItem extends CustomHTMLElement {
  gameOdds: unknown | null = null //could you find a better type for this?

  constructor() {
    super()

    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true),
    )
  }

  connectedCallback() {
    this.render()
  }

  //indicates to observe the game-odds attribute values
  static get observedAttributes() {
    return ['game-odds']
  }

  //INPUT (gameOdds)
  //automatically called each time the game-odds attribute is updated
  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name !== 'game-odds') {
      return
    }

    this.gameOdds = JSON.parse(newValue)
    this.render()
  }

  render() {
    const newTemplate = createTemplate(this.gameOdds)
    this.renderComponent(newTemplate)
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

  //changing css class to show the selected button
  selectClickedButton(clickedButton: Element) {
    const buttons = this.shadowRoot?.querySelectorAll(
      '.betting-item__odds button',
    )

    buttons?.forEach((button: Element) =>
      button === clickedButton
        ? button.classList.add('selected')
        : button.classList.remove('selected'),
    )
  }

  //OUTPUT
  //send an event with your bet ('TEAM_1_WINS' | 'DRAW' | 'TEAM_2_WINS') and odds each time you click on a button
  //it can be used by betting list component
  handleSelectBet(buttonElement: Element, betChoice: BetChoice) {
    this.selectClickedButton(buttonElement)
    window.dispatchEvent(
      new CustomEvent(SELECT_BET_CHOICE, {
        detail: { gameOdds: this.gameOdds, betChoice },
      }),
    )
  }
}

customElements.define('arl-betting-item', BettingItem)
