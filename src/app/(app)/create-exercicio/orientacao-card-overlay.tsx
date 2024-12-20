import type { Passo } from '@/utils/orientacao-passos'

export interface OrientacoesInputProps {
  step: Passo
}

export function OrientacaoCardOverlay({ step }: OrientacoesInputProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-4">?.</div>
      <div className="line-clamp-1">{step.orientacao}</div>
    </div>
  )
}
