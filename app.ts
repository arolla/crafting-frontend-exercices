import css from './app.scss'

import './src/components/header/header'

const template = document.createElement('template')
template.innerHTML = `
<style>${css}</style>

<div class="app">
    <arl-header></arl-header>
    <!-- is-user-logged-in is an attribute-->
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
