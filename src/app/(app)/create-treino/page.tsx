import { redirect } from 'next/navigation'

import { loggedUser } from '@/auth/auth'
import { Header } from '@/components/header'

import { TreinoForm } from './treino-form'

export default async function CreateTreino() {
  const user = await loggedUser()

  if (!user) redirect('/')

  return (
    <>
      <Header />
      <div className="space-y-4 p-2">
        <h1 className="pb-2 text-2xl font-bold">Criar treino</h1>

        <TreinoForm idProfessor={user.id} />
      </div>
    </>
  )
}
