import { TreinoForm } from './treino-form'

export default async function CreateTreino() {
  return (
    <div className="space-y-4 p-2">
      <h1 className="pb-2 text-2xl font-bold">Criar treino</h1>

      <TreinoForm />
    </div>
  )
}
