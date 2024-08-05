import { html } from 'common-tags'
import css from './app.scss?inline'
import { Header } from './components/header/header'
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
      <arl-header></arl-header>
      <!-- is-user-logged-in is an attribute-->
      <arl-footer is-user-logged-in="true"></arl-footer>
    </div>
  `

  static register() {
    defineCustomElement(App)
    Header.register()
  }

  constructor() {
    super()
    const template = createTemplateElement(App)
    attachShadow(this, template)
  }
}
