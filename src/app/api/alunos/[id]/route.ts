import { NextResponse } from 'next/server'

import { getAluno } from './get-aluno'

interface AlunoProps {
  id: string
}

export async function GET(request: Request, context: { params: AlunoProps }) {
  const aluno = await getAluno({ id: context.params.id })

  return NextResponse.json(aluno)
}
