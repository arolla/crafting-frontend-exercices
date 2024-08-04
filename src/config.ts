const { VERBOSE } = process.env

const verbose = VERBOSE === 'true'

export const config = {
  verbose,
}
