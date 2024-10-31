import { NextResponse } from 'next/server'

import { getAluno } from './get-aluno'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const aluno = await getAluno({ id: (await params).id })

  return NextResponse.json(aluno)
}
