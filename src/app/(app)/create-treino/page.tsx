import { Header } from '@/components/header'

import { auth } from '@/auth/auth'
import { redirect } from 'next/navigation'
import { TreinoForm } from './treino-form'

export default async function CreateTreino() {
  const user = await auth()

  if (!user) redirect('/')

  return (
    <>
      <Header />
      <div className="space-y-4 p-2">
        <h1 className="pb-2 text-2xl font-bold">Criar treino</h1>

        <TreinoForm idProfessor={user.id}/>
      </div>
    </>
  )
}
