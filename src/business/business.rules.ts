import type { BetSlip } from '@models/bets/bet-slip'

export const computePotentialGains = (
  stake: number,
  betsSlip: BetSlip[],
): number =>
  betsSlip.length
    ? Math.floor(
        stake *
          betsSlip.reduce((acc, betSlip) => acc * betSlip.selectedOdds, 1),
      )
    : 0
