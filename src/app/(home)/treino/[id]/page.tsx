import { Capa } from '@/components/Capa'
import { Exercicios } from '@/components/Exercicios'
import { Sobre } from '@/components/Sobre'
import { Separator } from '@/components/ui/separator'

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
    </div>
  )
}
