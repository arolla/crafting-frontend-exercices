import { html } from 'common-tags'
import css from './app.scss?inline'
import {
  WebComponent,
  type WebComponentConstructor,
} from './utils/WebComponent'
import { staticImplements } from './utils/decorators'
import {
  attachShadow,
  createTemplateElement,
  defineCustomElement,
} from './utils/webComponents.helper'

@staticImplements<WebComponentConstructor>()
export class App extends WebComponent {
  static tag = 'arl-app'

  static createTemplate = () => html`
    <style>
      ${css}
    </style>
    <div class="app">
      it works !! :)
    </div>
  `

  static register() {
    defineCustomElement(App)
  }

  constructor() {
    super()
    const template = createTemplateElement(App)
    attachShadow(this, template)
  }
}
