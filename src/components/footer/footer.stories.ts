import { StorybookControls } from '../../models'
import './footer'

export default {
  title: 'Components/Footer',
  argTypes: {
    isUserConnected: {
      control: 'boolean',
    },
  },
}

type ArgTypes = {
  isUserConnected: StorybookControls
}

export const Default = (argTypes: ArgTypes) =>
  `<arl-footer is-user-logged-in="${argTypes.isUserConnected}"></arl-footer>`
