import { type NextRequest, NextResponse } from 'next/server'

import { createAluno, type CreateAlunoProps } from './create-aluno'

export async function POST(request: NextRequest) {
  const formData: CreateAlunoProps = await request.json()

  const aluno = await createAluno(formData)

  return NextResponse.json(aluno, { status: 201 })
}
