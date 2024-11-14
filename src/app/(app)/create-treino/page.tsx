import { CircleChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getCurrentAlunos, getCurrentExercicios } from '@/auth/auth'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'

import { TreinoForm } from './treino-form'

export default async function CreateTreino() {
  const alunos = await getCurrentAlunos()

  const exercicios = await getCurrentExercicios()

  if (!alunos || !exercicios) redirect('/')

  return (
    <>
      <Header />
      <div className="space-y-4 p-4">
        <h1 className="pb-2 text-2xl font-bold">Criar treino</h1>

        <Button size="sm" variant="outline" asChild>
          <Link href="/treinos">
            <CircleChevronLeft className="mr-2 size-4" />
            Voltar
          </Link>
        </Button>

        <TreinoForm alunos={alunos} exercicios={exercicios} />
      </div>
    </>
  )
}
