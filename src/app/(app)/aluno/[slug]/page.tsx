import { CircleChevronLeft, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { getAluno } from '@/http/get-aluno'

import { TreinosList } from './treinos-list'

export default async function Aluno({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const aluno = await getAluno((await params).slug)

  const currentSlug = aluno ? aluno.slug : null

  if (!aluno) redirect('/')

  return (
    <>
      <Header />
      <div className="space-y-4 p-4">
        <h1 className="pb-2 text-2xl font-bold">Treinos de {aluno.nome}</h1>

        <div className="space-y-4">
          <div className="space-x-2">
            <Button size="sm" variant="outline" asChild>
              <Link href="/">
                <CircleChevronLeft className="mr-2 size-4" />
                Voltar
              </Link>
            </Button>
            <Button size="sm" variant="secondary" asChild>
              <Link href={`/create-treino?aluno=${currentSlug}`}>
                <PlusCircle className="mr-2 size-4" />
                Novo treino
              </Link>
            </Button>
          </div>
          {currentSlug && <TreinosList alunoSlug={currentSlug} />}
        </div>
      </div>
    </>
  )
}
