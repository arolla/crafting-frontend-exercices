import { stringify, render } from '../../utils'
import { BettingItem } from './betting-item'

let bettingItem: HTMLElement
const DUMMY_GAME_ODDS = {
  gameId: 'gameId',
  team1: 'team1',
  team2: 'team2',
  oddsTeam1: 1,
  oddsDraw: 2,
  oddsTeam2: 3,
}

describe('BettingItem Component', () => {
  beforeEach(() => {
    bettingItem = render(BettingItem)
    bettingItem.setAttribute('game-odds', stringify(DUMMY_GAME_ODDS))
  })

  //todo write the component tests here
})
