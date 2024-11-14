import { NextResponse } from 'next/server'

import { deleteTreino } from './delete-treino'
import { duplicateTreino, type DuplicateTreinoProps } from './duplicate-treino'
import { getTreino } from './get-treino'
import { updateTreino, type UpdateTreinoProps } from './update-treino'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const treino = await getTreino({ id: (await params).id })

  return NextResponse.json(treino)
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const treino = await deleteTreino({ id: (await params).id })

  return NextResponse.json(treino, { status: 200 })
}

export async function PUT(request: Request) {
  const formData: UpdateTreinoProps = await request.json()

  const exerciciosAtualizados = await updateTreino(formData)

  return NextResponse.json(exerciciosAtualizados, { status: 200 })
}

export async function PATCH(request: Request) {
  const formData: DuplicateTreinoProps = await request.json()

  const exerciciosAtualizados = await duplicateTreino(formData)

  return NextResponse.json(exerciciosAtualizados, { status: 200 })
}
