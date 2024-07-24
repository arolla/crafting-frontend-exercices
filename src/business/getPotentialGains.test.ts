import { BetChoice, BetSlip } from '../models'
import { DRAW, TEAM_1_WINS } from '../shared'
import { getPotentialGains } from './getPotentialGains'

const betOn = (gameId: string, result: BetChoice, odds: number): BetSlip => (
  {
    gameId,
    selectedChoice: result,
    selectedOdds: odds,
  })
const EMPTY_BETS_SLIP: BetSlip[] = []
const FILLED_BETS_SLIP: BetSlip[] = [
  betOn('id1', TEAM_1_WINS, 1.52),
  betOn('id2', DRAW, 1.12),
]

const EMPTY_STARTING_BET = 0
const POSITIVE_STARTING_BET = 100

describe('getPotentialGains', () => {
  it('should return 0 when the user did not place any bets or choose any games to bet on', () => {
    expect(getPotentialGains(EMPTY_STARTING_BET, EMPTY_BETS_SLIP)).toBe(0)
  })

  it('should return 0 when the user did not make a bet even though he/she chose games to bet on', () => {
    expect(getPotentialGains(EMPTY_STARTING_BET, FILLED_BETS_SLIP)).toBe(0)
  })

  it('should return a potential gain of 200€ when the user made a bet of 100€ on a score with odds of 2', () => {
    expect(getPotentialGains(
      POSITIVE_STARTING_BET,
      [betOn('id1', TEAM_1_WINS, 2)]
    )).toBe(200)
  })

  it('should return a potential gain of 600€ when the user made a bet of 100€ on a score with odds of 2 and a score with odds of 3', () => {
    expect(getPotentialGains(
      POSITIVE_STARTING_BET,
      [betOn('id1', TEAM_1_WINS, 2), betOn('id2', DRAW, 3)]
    )).toBe(600)
  })

  it('should return a potential gain of 312€ (rounded down) when the user made a bet of 100€ on a score with odds of 2.5 and a score with odds of 1.25', () => {
    expect(getPotentialGains(
      POSITIVE_STARTING_BET,
      [betOn('id1', TEAM_1_WINS, 2.5), betOn('id2', DRAW, 1.25)]
    )).toBe(312)
  })
})
