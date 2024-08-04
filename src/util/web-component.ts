import { config } from '@config'

export interface WebComponentConstructor {
  register(): void
  new (): WebComponent
}

export abstract class WebComponent extends HTMLElement {
  static register(
    elementName: string,
    eltConstructor: CustomElementConstructor,
  ) {
    if (config.verbose) {
      console.log(`Registering web component "${elementName}"…`)
    }
    const existingEltConstructor = customElements.get(elementName)
    if (existingEltConstructor) {
      if (config.verbose) {
        console.warn(`Web component "${elementName}" already registered!`)
      }
      return
    }
    customElements.define(elementName, eltConstructor)
    if (config.verbose) {
      console.log(`Web component "${elementName}" registered.`)
    }
  }

  constructor() {
    super()
    const template = document.createElement('template')
    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true),
    )
  }

  abstract buildTemplate(): string

  async connectedCallback() {
    this.render()
  }

  render() {
    const { shadowRoot } = this
    if (!shadowRoot) {
      return
    }
    shadowRoot.innerHTML = this.buildTemplate()
  }

  show(selector: string) {
    const element = this.shadowRoot?.querySelector(selector)
    if (!element) {
      return
    }
    element.removeAttribute('hidden')
  }

  hide(selector: string) {
    const element = this.shadowRoot?.querySelector(selector)
    if (!element) {
      return
    }
    element.setAttribute('hidden', '')
  }

  toggleDisplay(selector: string, shouldDisplay: boolean) {
    if (!shouldDisplay) {
      this.hide(selector)
      return
    }
    this.show(selector)
  }

  sendEvent(name: string, value: unknown) {
    window.dispatchEvent(
      new CustomEvent(name, {
        detail: value,
      }),
    )
  }

  onEvent<T = unknown>(name: string, handler: (value: T) => void) {
    window.addEventListener(name, (event: Event) => {
      const { detail } = event as CustomEvent<T>
      handler(detail)
    })
  }
}
