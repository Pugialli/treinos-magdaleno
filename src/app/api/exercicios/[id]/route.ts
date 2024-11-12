import { type NextRequest, NextResponse } from 'next/server'

import { deleteExercicio } from './delete-exercicio'
import { getExercicio } from './get-exercicio'
import { updateExercicio, type UpdateExerciciosProps } from './update-exercicio'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const exercicio = await getExercicio({ id: (await params).id })

  return NextResponse.json(exercicio, { status: 200 })
}

export async function PATCH(request: NextRequest) {
  const formData: UpdateExerciciosProps = await request.json()

  const exercicio = await updateExercicio(formData)

  return NextResponse.json(exercicio, { status: 201 })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const exercicio = await deleteExercicio({ id: (await params).id })

  return NextResponse.json(exercicio, { status: 200 })
}
