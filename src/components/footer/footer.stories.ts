import { StorybookControls } from '../../models'
import './footer'

export default {
  title: 'Components/Footer',
  argTypes: {
    isUserLoggedIn: {
      control: 'boolean',
    },
  },
}

type ArgTypes = {
  isUserLoggedIn: StorybookControls
}

export const Default = (argTypes: ArgTypes) =>
  `<arl-footer is-user-logged-in="${argTypes.isUserLoggedIn}"></arl-footer>`
