import { html } from 'common-tags'
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
export class Footer extends CustomWebComponent {
  static tag = 'arl-footer'

  // Dynamic template creation
  static createTemplate = (text: string) => html`
    <style>${css}</style>
    <div id="footer">
        <h3>Need help?</h3>
        <p>${text}</p>
    </div>
  `

  /**
   * TODO: Standard method that you have to define to specify which attributes you want to observe
   *    /!\ attributes names are always lower case strings
   **/
  static get observedAttributes() {
    return ['is-user-logged-in']
  }

  static register() {
    defineCustomElement(Footer)
  }

  constructor() {
    super()
    const template = createTemplateElement(Footer, false)
    attachShadow(this, template)
    this.render()
  }

  // Standard method automatically called each time a component attribute changes
  attributeChangedCallback(
    attributeTagName: string,
    _formerValue: string,
    newValue: string,
  ) {
    if (attributeTagName === 'is-user-logged-in') {
      this.render(newValue)
    }
  }

  render(isUserLoggedIn?: string) {
    const footerText =
      isUserLoggedIn === 'true'
        ? 'Contact | Map | Log out'
        : 'Contact | Map | Log in'
    const newTemplate = Footer.createTemplate(footerText)
    this.renderComponent(newTemplate)
  }
}
