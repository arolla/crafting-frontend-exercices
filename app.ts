import css from './app.scss'

import './src/components/footer/footer'
import './src/components/header/header'
import './src/pages/betting-page'

const template = document.createElement('template')
template.innerHTML = `
<style>${css}</style>

<div class="app">
    <arl-header></arl-header>
    <arl-betting-page></arl-betting-page>
    <arl-footer is-user-logged-in="true"></arl-footer>
</div>
`

export class App extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true),
    )
  }
}

customElements.define('arl-app', App)
