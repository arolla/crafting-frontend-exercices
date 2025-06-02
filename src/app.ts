import { Footer } from '@components/footer/footer'
import { Header } from '@components/header/header'
import { BettingPage } from '@pages/betting-page'
import { staticImplements } from '@util/decorators.helper.'
import { WebComponent, type WebComponentConstructor } from '@util/web-component'
import { html } from 'common-tags'
import css from './app.scss?inline'

@staticImplements<WebComponentConstructor>()
export class App extends WebComponent {
  static register() {
    WebComponent.register('arl-app', App)
    Header.register()
    BettingPage.register()
    Footer.register()
  }

  buildTemplate() {
    return html`
      <style>
        ${css}
      </style>
      <div class="app">
        <arl-header></arl-header>
        <arl-betting-page></arl-betting-page>
        <arl-footer is-user-logged-in="true"></arl-footer>
      </div>
    `
  }
}
