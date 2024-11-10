import { type NextRequest, NextResponse } from 'next/server'

import { getAluno } from './get-aluno'
import { updateAluno, type UpdateAlunoProps } from './update-aluno'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const aluno = await getAluno({ slug: (await params).slug })

  return NextResponse.json(aluno)
}

export async function PATCH(request: NextRequest) {
  const formData: UpdateAlunoProps = await request.json()

  const aluno = await updateAluno(formData)

  return NextResponse.json(aluno, { status: 201 })
}
