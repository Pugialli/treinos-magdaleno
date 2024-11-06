import { NextResponse } from 'next/server'

import { getAluno } from './get-aluno'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const aluno = await getAluno({ slug: (await params).slug })

  return NextResponse.json(aluno)
}
