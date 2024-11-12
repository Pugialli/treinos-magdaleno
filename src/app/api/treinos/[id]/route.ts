import { NextResponse } from 'next/server'

import { deleteTreino } from './delete-treino'
import { getTreino } from './get-treino'

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
