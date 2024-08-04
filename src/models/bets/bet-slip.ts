import type { BetChoice } from '@models/bets/bet-choice'

export type BetSlip = {
  gameId: string
  selectedChoice: BetChoice
  selectedOdds: number
}
