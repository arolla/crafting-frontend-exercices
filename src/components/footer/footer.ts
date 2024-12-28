import { WebComponent } from '@util/web-component'

export default class Footer extends WebComponent {
  static register() {
    WebComponent.register('arl-footer', Footer)
  }

  // TODO
  buildTemplate(): string {
    throw new Error('Method not implemented.')
  }
}
