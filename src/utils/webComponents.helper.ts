import type { WebComponent, WebComponentConstructor } from './WebComponent'

export const attachShadow = (
  component: WebComponent,
  template: HTMLTemplateElement,
) => {
  component
    .attachShadow({ mode: 'open' })
    .appendChild(template.content.cloneNode(true))
}

export const createTemplateElement = (
  WebComponentType: WebComponentConstructor,
  withContent = true,
): HTMLTemplateElement => {
  const template = document.createElement('template')
  if (withContent) {
    template.innerHTML = WebComponentType.createTemplate()
  }
  return template
}

export const defineCustomElement = (
  WebComponentType: WebComponentConstructor,
) => {
  customElements.define(WebComponentType.tag, WebComponentType)
}

export const render = (
  WebComponentType: WebComponentConstructor,
): WebComponent => {
  WebComponentType.register()
  const instance = new WebComponentType()
  if (typeof instance.connectedCallback === 'function') {
    instance.connectedCallback()
  }
  return instance
}
