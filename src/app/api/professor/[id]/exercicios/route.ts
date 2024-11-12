import { type NextRequest, NextResponse } from 'next/server'

import { createExercicio, type CreateExercicioProps } from './create-exercicio'
import { getExercicios } from './get-exercicios'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const response = await getExercicios({ idProfessor: (await params).id })

  return NextResponse.json(response)
}

export async function POST(request: NextRequest) {
  const formData: CreateExercicioProps = await request.json()

  const exercicio = await createExercicio(formData)

  return NextResponse.json(exercicio, { status: 201 })
}
