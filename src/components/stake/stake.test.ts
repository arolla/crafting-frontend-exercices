import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals'
import { dispatchMockedEventWith, render } from '../../utils/test.helper'
import { Stake } from './stake'

describe('Stake Component', () => {
  const spyDispatchEvent = jest.spyOn(window, 'dispatchEvent')
  let dispatchEvent: (key: string, value: string | number) => void
  let stake: HTMLElement
  beforeAll(() => {
    Stake.register()
  })
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
