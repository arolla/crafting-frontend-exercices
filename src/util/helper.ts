export const withDelay = <T>(
  fn: () => Promise<T>,
  delay?: number,
): Promise<T> =>
  new Promise((resolve, reject) => {
    setTimeout(async () => {
      fn().then(resolve, reject)
    }, delay)
  })
