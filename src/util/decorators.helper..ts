export const staticImplements =
  <T>(): (<U extends T>(classConstructor: U) => void) =>
  () => {}
