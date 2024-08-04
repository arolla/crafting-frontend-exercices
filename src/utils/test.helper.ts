import type { WebComponent, WebComponentConstructor } from './WebComponent'

export const dispatchMockedEventWith =
  (element: Element) =>
  (key: string, value: number | string): void => {
    const inputElement = element.shadowRoot?.querySelector('input')
    if (!inputElement) {
      return
    }
    inputElement.value = value.toString()
    const fakeEvent = new Event(key)
    inputElement.dispatchEvent(fakeEvent)
  }

export const parse = (value: string) => {
  try {
    return JSON.parse(value)
  } catch {
    return Number.isNaN(Number(value)) ? value : Number(value)
  }
}

export const render = (
  WebComponentType: WebComponentConstructor,
): WebComponent => {
  const instance = new WebComponentType()
  if (typeof instance.connectedCallback === 'function') {
    instance.connectedCallback()
  }
  return instance
}

export const stringify = (value: unknown) =>
  typeof value === 'string' ? value : JSON.stringify(value)
