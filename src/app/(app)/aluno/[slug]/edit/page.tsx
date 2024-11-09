import { getAluno } from '@/http/get-aluno'

export default async function EditAluno({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const aluno = await getAluno((await params).slug)

  return (
    <div>
      <h1>Editar {aluno!.nome}</h1>
    </div>
  )
}
