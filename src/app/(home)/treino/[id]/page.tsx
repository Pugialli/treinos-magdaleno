import { Capa } from '@/app/(home)/treino/[id]/Capa'
import { Sobre } from '@/app/(home)/treino/[id]/Sobre'
import { Separator } from '@/components/ui/separator'

import { Exercicios } from './Exercicios'

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return (
    <div>
      <Capa treinoId={(await params).id} />
      <Separator className="bg-black" />
      <Sobre />
      <Separator className="bg-black" />
      <Exercicios treinoId={(await params).id} />
      <Separator className="bg-black" />
    </div>
  )
}
