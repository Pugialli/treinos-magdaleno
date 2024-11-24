import { PlusSquare } from 'lucide-react'
import Link from 'next/link'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'

import { AlunosList } from './alunos-list'

export default function Home() {
  return (
    <>
      <Header />

      <div className="space-y-8 p-8">
        <h1 className="pb-2 text-2xl font-bold">Alunos</h1>

        <AlunosList />

        <Button size="lg" asChild>
          <Link href={`/create-aluno`}>
            <PlusSquare className="size-6" />
            Novo aluno
          </Link>
        </Button>
      </div>
    </>
  )
}
