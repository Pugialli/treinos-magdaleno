import { CircleChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { TreinoForm } from '@/app/(app)/create-treino/treino-form'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { getTreino } from '@/http/get-treino'

export default async function EditTreino({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const treino = await getTreino((await params).id)

  if (!treino) redirect('/')

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

        <TreinoForm
          idProfessor={treino.aluno.idProfessor}
          isUpdating
          initialData={treino}
        />
      </div>
    </>
  )
}
