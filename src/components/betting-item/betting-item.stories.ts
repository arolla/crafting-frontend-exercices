import { GameOdds, StorybookControls } from '../../models'
import './betting-item'

export default {
  title: 'Components/Betting Item',
}

export const EmptyBettingItem = () => '<arl-betting-item></arl-betting-item>'

type ArgTypes = {
  gameOdds: StorybookControls<GameOdds>
}

export const FilledBettingItem = (argTypes: ArgTypes) =>
  `<arl-betting-item game-odds='${JSON.stringify(argTypes.gameOdds)}'></arl-betting-item>`
FilledBettingItem.argTypes = {
  gameOdds: {
    control: 'object',
    defaultValue: {
      gameId: '1',
      team1: 'Newcastle',
      team2: 'Liverpool',
      oddsTeam1: 1.23,
      oddsDraw: 2.54,
      oddsTeam2: 3.88,
    },
  },
}
