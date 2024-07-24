import { CustomHTMLElement } from '../../utils'
import css from './css-exercise.scss'

const template = document.createElement('template')
template.innerHTML = `
  <style>${css}</style>
    <div class="css-exercise">
        <div class="notification_panel_structure notification_panel_skin">
        <span class="notification_panel__title">What do you want to do ?</span>
        
            <div class="notification_panel__actions">
                 <button id="notification_panel__button-add" >Add</button>
                 <button id="notification_panel__button-remove">Remove</button>
             </div>
        </div>
    </div>
  `

export class CssExercise extends CustomHTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true),
    )
  }
}

customElements.define('arl-css-exercise', CssExercise)
