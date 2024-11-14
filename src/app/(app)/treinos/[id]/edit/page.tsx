import { CircleChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { TreinoForm } from '@/app/(app)/create-treino/treino-form'
import { getCurrentAlunos, getCurrentExercicios } from '@/auth/auth'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { getTreino } from '@/http/get-treino'

export default async function EditTreino({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const treino = await getTreino((await params).id)

  const alunos = await getCurrentAlunos()

  const exercicios = await getCurrentExercicios()

  if (!treino || !alunos || !exercicios) redirect('/')

  return (
    <>
      <Header />
      <div className="space-y-4 p-4">
        <h1 className="pb-2 text-2xl font-bold">Editar treino</h1>

        <Button size="sm" variant="outline" asChild>
          <Link href="/treinos">
            <CircleChevronLeft className="mr-2 size-4" />
            Voltar
          </Link>
        </Button>

        <TreinoForm
          alunos={alunos}
          exercicios={exercicios}
          initialData={treino}
          isUpdating
        />
      </div>
    </>
  )
}
