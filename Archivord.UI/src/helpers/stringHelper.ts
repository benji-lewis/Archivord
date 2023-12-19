export const getAcronym = (name: string): string => {
  return name.split(/\s/).reduce((response: string, word: string) => response += word.slice(0, 1), '')
}