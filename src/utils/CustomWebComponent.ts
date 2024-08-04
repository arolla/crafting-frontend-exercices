import { WebComponent } from './WebComponent'

export abstract class CustomWebComponent extends WebComponent {
  displayElement(elementName: string) {
    const element = this.shadowRoot?.querySelector(elementName)
    element?.removeAttribute('hidden')
  }

  hideElement(elementName: string) {
    const element = this.shadowRoot?.querySelector(elementName)
    element?.setAttribute('hidden', '')
  }

  renderComponent(html: string): void {
    if (!this.shadowRoot) {
      return
    }
    this.shadowRoot.innerHTML = html
  }

  toggleDisplay(elementSelector: string, shouldDisplay: boolean) {
    if (!shouldDisplay) {
      this.hideElement(elementSelector)
      return
    }
    this.displayElement(elementSelector)
  }
}
