import { CircleChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { AlunoForm } from '@/app/(app)/create-aluno/aluno-form'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { getAluno } from '@/http/get-aluno'

export default async function EditAluno({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const aluno = await getAluno((await params).slug)

  if (!aluno) redirect('/')

  return (
    <>
      <Header />
      <div className="space-y-4 p-4">
        <h1 className="pb-2 text-2xl font-bold">Editar aluno</h1>

        <Button size="sm" variant="outline" asChild>
          <Link href="/">
            <CircleChevronLeft className="mr-2 size-4" />
            Voltar
          </Link>
        </Button>

        <AlunoForm isUpdating initialData={aluno} />
      </div>
    </>
  )
}
