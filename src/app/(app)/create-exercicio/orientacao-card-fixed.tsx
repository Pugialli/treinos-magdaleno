import type { Passo } from '@/utils/orientacao-passos'

export interface OrientacoesInputProps {
  step: Passo
  index?: number
}

export function OrientacaoCardFixed({ step, index }: OrientacoesInputProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-4">{index ? `${index}.` : '?.'}</div>
      <div className="line-clamp-1">{step.orientacao}</div>
    </div>
  )
}
