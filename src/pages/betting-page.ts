import '../components/betting-list/betting-list'

import { CustomHTMLElement } from '../utils'
import css from './betting-page.scss'

const template = document.createElement('template')
template.innerHTML = `
<style>${css}</style>
<div class="betting-page">
    <arl-betting-list></arl-betting-list>
</div>
`

export class BettingPage extends CustomHTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true),
    )
  }
}

customElements.define('arl-betting-page', BettingPage)
