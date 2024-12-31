import { beforeAll, describe, expect, it } from '@jest/globals'
import type { BetSlip } from '@models/bets/bet-slip'
import { DRAW, TEAM_1_WINS } from '@shared/constants/bet-choice'
import { stringify } from '@util/string.helper'
import { Summary } from './summary'

const DUMMY_BETS_SLIP: BetSlip[] = [
  {
    gameId: 'id1',
    selectedChoice: TEAM_1_WINS,
    selectedOdds: 1.52,
  },
  {
    gameId: 'id2',
    selectedChoice: DRAW,
    selectedOdds: 1.12,
  },
]
const DUMMY_STAKE = 100

describe('Bets-Summary Component', () => {
  beforeAll(() => {
    Summary.register()
  })
  test('should render correctly summary when user made bets slip with 100€ stake', () => {
    // Given
    const summary = new Summary()
    summary.render()
    // When
    summary.betsSlip = DUMMY_BETS_SLIP
    summary.setAttribute('stake', `${DUMMY_STAKE}`)
    // Then
    expect(summary?.shadowRoot?.querySelector('.summary')).toMatchSnapshot()
  })
})
