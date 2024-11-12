export interface Passo {
  ordem: number
  orientacao: string
}

export function orientacaoToPassos(orientacao: string) {
  return [...orientacao.matchAll(/(\d+)\.([\s\S]+?)(?=\d+\.|$)/g)].map(
    (match) => ({
      ordem: Number(match[1]),
      orientacao: match[2].trim(),
    }),
  )
}

export function passosToOrientacao(passos: Passo[]): string {
  return passos
    .map((passo) => {
      const orientacaoComPonto = passo.orientacao.trim().endsWith('.')
        ? passo.orientacao.trim()
        : passo.orientacao.trim() + '.'
      return `${passo.ordem}.${orientacaoComPonto}`
    })
    .join(' ')
}
