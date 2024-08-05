import type { BetChoice } from './betChoice'

export type BetSlip = {
  gameId: string
  selectedChoice: BetChoice
  selectedOdds: number
}
