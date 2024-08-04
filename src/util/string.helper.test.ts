import { parse, stringify } from '@util/string.helper'

describe('util', () => {
  describe('string helper', () => {
    describe('parse', () => {
      type Testcase = {
        value: string
        expectedResult: unknown
      }
      const testcases: Testcase[] = [
        {
          value: '"hello world"',
          expectedResult: 'hello world',
        },
        {
          value: '123456',
          expectedResult: 123456,
        },
        {
          value: 'true',
          expectedResult: true,
        },
        {
          value: '{"foo":"bar"}',
          expectedResult: { foo: 'bar' },
        },
        {
          value: '{"foo":{"hello":"world"}}',
          expectedResult: { foo: { hello: 'world' } },
        },
      ]
      test.each(testcases)(
        'should return $expectedResult given $value',
        ({ value, expectedResult }) => {
          // When
          const result = parse(value)
          // Then
          expect(result).toStrictEqual(expectedResult)
        },
      )
    })
    describe('stringify', () => {
      type Testcase = {
        value: unknown
        expectedResult: string
      }
      const testcases: Testcase[] = [
        {
          value: 'hello world',
          expectedResult: '"hello world"',
        },
        {
          value: 123456,
          expectedResult: '123456',
        },
        {
          value: true,
          expectedResult: 'true',
        },
        {
          value: { foo: 'bar' },
          expectedResult: '{"foo":"bar"}',
        },
        {
          value: { foo: { hello: 'world' } },
          expectedResult: '{"foo":{"hello":"world"}}',
        },
      ]
      test.each(testcases)(
        'should return $expectedResult given $value',
        ({ value, expectedResult }) => {
          // When
          const result = stringify(value)
          // Then
          expect(result).toBe(expectedResult)
        },
      )
    })
  })
})
