import { staticImplements } from '@util/decorators.helper.'
import { WebComponent, type WebComponentConstructor } from '@util/web-component'
import { html } from 'common-tags'
import css from './app.scss?inline'

@staticImplements<WebComponentConstructor>()
export class App extends WebComponent {
  static register() {
    WebComponent.register('arl-app', App)
  }

  buildTemplate() {
    return html`
      <style>
        ${css}
      </style>
      <div class="app">
        <h2 style="margin: 10px;">it works !! :)</h2>
      </div>
    `
  }
}
