import { AlunoForm } from './aluno-form'

export default async function CreateAluno() {
  return (
    <div className="space-y-4 p-2">
      <h1 className="pb-2 text-2xl font-bold">Criar aluno</h1>

      <AlunoForm />
    </div>
  )
}
