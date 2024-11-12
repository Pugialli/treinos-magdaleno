import { CircleChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { ExercicioForm } from '@/app/(app)/create-exercicio/exercicio-form'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { getExercicio } from '@/http/get-exercicio'

export default async function EditExercicio({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const exercicio = await getExercicio((await params).id)

  if (!exercicio) redirect('/')

  return (
    <>
      <Header />
      <div className="space-y-4 p-4">
        <h1 className="pb-2 text-2xl font-bold">Editar exercício</h1>

        <Button size="sm" variant="outline" asChild>
          <Link href="/exercicios">
            <CircleChevronLeft className="mr-2 size-4" />
            Voltar
          </Link>
        </Button>

        <ExercicioForm isUpdating initialData={exercicio} />
      </div>
    </>
  )
}
