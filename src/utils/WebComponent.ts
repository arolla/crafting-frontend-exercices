export interface WebComponentConstructor {
  tag: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  createTemplate: (...args: any) => string
  register(): void
  new (): WebComponent
}

export abstract class WebComponent extends HTMLElement {
  connectedCallback?(): void
}
