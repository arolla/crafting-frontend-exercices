import { staticImplements } from '@util/decorators.helper.'
import { WebComponent, type WebComponentConstructor } from '@util/web-component'
import { html } from 'common-tags'
import css from './css-exercise.scss?inline'

@staticImplements<WebComponentConstructor>()
export class CssExercise extends WebComponent {
  static register() {
    WebComponent.register('arl-css-exercise', CssExercise)
  }

  buildTemplate() {
    return html`
      <style>${css}</style>
      <div class="css-exercise">
        <div class="notification_panel_structure notification_panel_skin">
          <span class="notification_panel__title">What do you want to do ?</span>
          <div class="notification_panel__actions">
            <button id="notification_panel__button-add">Add</button>
            <button id="notification_panel__button-remove">Remove</button>
          </div>
        </div>
      </div>
    `
  }
}
