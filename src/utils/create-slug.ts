export function createSlug(text: string): string {
  const words = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .trim()
    .split(/\s+/)

  if (words.length < 2) {
    return words[0]?.toLowerCase() || ''
  }

  const first = words[0]
  const last = words[words.length - 1]

  return `${first}-${last}`.toLowerCase()
}
