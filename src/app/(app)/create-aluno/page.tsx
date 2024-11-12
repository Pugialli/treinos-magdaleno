import { CircleChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'

import { AlunoForm } from './aluno-form'

export default function CreateAluno() {
  return (
    <>
      <Header />
      <div className="space-y-4 p-4">
        <h1 className="pb-2 text-2xl font-bold">Criar aluno</h1>

        <Button size="sm" variant="outline" asChild>
          <Link href="/">
            <CircleChevronLeft className="mr-2 size-4" />
            Voltar
          </Link>
        </Button>

        <AlunoForm />
      </div>
    </>
  )
}
