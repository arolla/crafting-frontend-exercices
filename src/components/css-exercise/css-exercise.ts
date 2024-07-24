import {CustomHTMLElement} from '../../utils'
import css from './css-exercise.scss'

const template = document.createElement('template')
template.innerHTML =`
  <style>${css}</style>
    <div class="css-exercise">
        <div class="container">
        <span>What do you want to do ?</span>
        
            <div class="buttonsContainer">
                 <button id="red">Add</button>
                 <button id="green">Remove</button>
             </div>
        </div>
    </div>
  `

export class CssExercise extends CustomHTMLElement {

    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))
    }

}

customElements.define('arl-css-exercise', CssExercise)
