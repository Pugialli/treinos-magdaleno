import { Capa } from '@/app/(app)/aluno/[slug]/treino/[id]/Capa'
import { Sobre } from '@/app/(app)/aluno/[slug]/treino/[id]/Sobre'
import { Separator } from '@/components/ui/separator'

import { Exercicios } from './Exercicios'

export default async function Treino({
  params,
}: {
  params: Promise<{ slug: string; id: string }>
}) {
  return (
    <div>
      <Capa treinoId={(await params).id} alunoSlug={(await params).slug} />
      <Separator className="bg-black" />
      <Sobre />
      <Separator className="bg-black" />
      <Exercicios treinoId={(await params).id} />
      <Separator className="bg-black" />
    </div>
  )
}
