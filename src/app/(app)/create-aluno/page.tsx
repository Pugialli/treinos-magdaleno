import { Header } from '@/components/header'

import { AlunoForm } from './aluno-form'

export default function CreateAluno() {
  return (
    <>
      <Header />
      <div className="space-y-4 p-4">
        <h1 className="pb-2 text-2xl font-bold">Criar aluno</h1>

        <AlunoForm />
      </div>
    </>
  )
}
