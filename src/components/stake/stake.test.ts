import { render, dispatchMockedEventWith } from '../../utils'
import { Stake } from './stake'

let dispatchEvent: (key: string, value: string | number) => void
let stake: HTMLElement

const spyDispatchEvent = jest.spyOn(window, 'dispatchEvent')

describe('Stake Component', () => {
  beforeEach(() => {
    stake = render(Stake)
    dispatchEvent = dispatchMockedEventWith(stake)
  })

  it('should emit new stake event when user choose a stake', () => {
    // Given
    const userInput = '2'

    // When
    dispatchEvent('keyup', userInput)

    // Then
    const expectedStake = (spyDispatchEvent.mock.calls[0][0] as CustomEvent)
      .detail.stake
    expect(expectedStake).toBe(userInput)
  })
})
