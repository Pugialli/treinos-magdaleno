import { NextResponse } from 'next/server'

import { getTreino } from './get-treino'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const treino = await getTreino({ id: (await params).id })

  return NextResponse.json(treino)
}
