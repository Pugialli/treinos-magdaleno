import { type NextRequest, NextResponse } from 'next/server'

import { createTreino, type CreateTreinoProps } from './create-treino'

export async function POST(request: NextRequest) {
  const formData: CreateTreinoProps = await request.json()

  const treino = await createTreino(formData)

  return NextResponse.json(treino, { status: 201 })
}
