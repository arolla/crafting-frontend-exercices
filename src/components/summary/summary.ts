import { getPotentialGains } from '../../business'
import { BetSlip } from '../../models'
import { CustomHTMLElement, parse } from '../../utils'
import css from './summary.scss'

const template = document.createElement('template')

function createTemplate(betSlipNumber: number, potentialGains: number) {
  return `
    <style>${css}</style>
    <div class="summary">
      <h3 class="summary__title">Betting summary</h3>
      <div class="summary__info">
        <p class="summary__info--bets-slip">Number of bets placed: ${betSlipNumber}</p>
        <p class="summary__info--potential-gains">Potential gain: ${potentialGains} €</p>
      </div>
    </div>
    `
}

export class Summary extends CustomHTMLElement {
  private betsSlip: BetSlip[] = []
  private stake = 0

  constructor() {
    super()

    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true),
    )
  }

  connectedCallback() {
    this.render()
  }

  static get observedAttributes() {
    return ['bets-slip', 'stake']
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'bets-slip':
        this.betsSlip = parse(newValue) as BetSlip[]
        break
      case 'stake':
        this.stake = parse(newValue) as number
        break
      default:
        break
    }

    if (this.stake && this.betsSlip.length) {
      this.render()
    }
  }

  render() {
    const betSlipNumber = this.betsSlip.length
    const potentialGains = getPotentialGains(this.stake, this.betsSlip)

    const newTemplate = createTemplate(betSlipNumber, potentialGains)
    this.renderComponent(newTemplate)
  }
}

customElements.define('arl-summary', Summary)
