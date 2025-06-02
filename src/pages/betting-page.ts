import { BettingList } from '@components/betting-list/betting-list'
import { staticImplements } from '@util/decorators.helper.'
import { WebComponent, type WebComponentConstructor } from '@util/web-component'
import { html } from 'common-tags'
import css from './betting-page.scss?inline'

@staticImplements<WebComponentConstructor>()
export class BettingPage extends WebComponent {
  static register() {
    WebComponent.register('arl-betting-page', BettingPage)
    BettingList.register()
  }

  buildTemplate() {
    return html`
      <style>${css}</style>
      <div class="betting-page">
        <arl-betting-list></arl-betting-list>
      </div>
    `
  }
}
