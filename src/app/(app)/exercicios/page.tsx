import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

import { Header } from '@/components/header'
import { Tabs } from '@/components/tabs'
import { Button } from '@/components/ui/button'

import { ExerciciosList } from './exercicios-list'

export default function Exercicios() {
  return (
    <>
      <Header />
      <Tabs />

      <div className="space-y-4 p-4">
        <h1 className="pb-2 text-2xl font-bold">Exercícios</h1>

        <div className="space-y-4">
          <Button size="sm" variant="secondary" asChild>
            <Link href={`/create-exercicio`}>
              <PlusCircle className="mr-2 size-4" />
              Novo exercício
            </Link>
          </Button>

          <ExerciciosList />
        </div>
      </div>
    </>
  )
}
