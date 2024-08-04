export const parse = <T>(value: string): T => JSON.parse(value) satisfies T

export const parseNumber = (value: string) => Number(value)

export const stringify = (value: unknown): string => JSON.stringify(value)
