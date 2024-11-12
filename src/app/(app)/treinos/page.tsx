import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

import { Header } from '@/components/header'
import { Tabs } from '@/components/tabs'
import { Button } from '@/components/ui/button'

import { TreinosList } from './treinos-list'

export default function Treinos() {
  return (
    <>
      <Header />
      <Tabs />

      <div className="space-y-4 p-4">
        <h1 className="pb-2 text-2xl font-bold">Treinos</h1>

        <div className="space-y-4">
          <Button size="sm" variant="secondary" asChild>
            <Link href={`/create-treino`}>
              <PlusCircle className="mr-2 size-4" />
              Novo treino
            </Link>
          </Button>

          <TreinosList />
        </div>
      </div>
    </>
  )
}
