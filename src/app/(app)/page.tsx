import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'

import { AlunosList } from './alunos-list'

export default function Home() {
  return (
    <>
      <Header />
      <div className="space-y-4 p-4">
        <h1 className="pb-2 text-2xl font-bold">Alunos</h1>

        <div className="space-y-4">
          <Button size="sm" variant="secondary" asChild>
            <Link href={`/create-aluno`}>
              <PlusCircle className="mr-2 size-4" />
              Novo aluno
            </Link>
          </Button>

          <AlunosList />
        </div>
      </div>
    </>
  )
}
