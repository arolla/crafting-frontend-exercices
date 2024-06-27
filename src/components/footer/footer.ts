import css from './footer.scss'
import { CustomHTMLElement } from '../../utils'

const template = document.createElement('template')

//dynamic template creation
function createTemplate(text: string): string {
  return `
    <style>${css}</style>
 
    <div id="footer">
        <h3>Need help?</h3>
        <p>${text}</p>
    </div>
    `
}

export class Footer extends CustomHTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true),
    )
    this.render()
  }

  /**
   * standard method that you have to define to specify which attributes you want to observe
   *    /!\ attributes names are always lower case strings
   **/
  static get observedAttributes() {
    return ['is-user-logged-in']
  }

  // standard method automatically called each time a component attribute changes
  attributeChangedCallback(
    attributeTagName: string,
    formerValue: string,
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

    const newTemplate = createTemplate(footerText)
    this.renderComponent(newTemplate)
  }
}

customElements.define('arl-footer', Footer)
