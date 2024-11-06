import { NextResponse } from 'next/server'

import { getAlunos } from './get-alunos'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const response = await getAlunos({ idProfessor: (await params).id })

  return NextResponse.json(response)
}
