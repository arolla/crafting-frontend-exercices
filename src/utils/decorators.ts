export const staticImplements =
  <T>(): (<U extends T>(classConstructor: U) => void) =>
  // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
  () => {}
