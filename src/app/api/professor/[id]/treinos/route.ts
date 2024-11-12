import { NextResponse } from 'next/server'

import { getTreinosFromProfessor } from './get-treinos-professor'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const response = await getTreinosFromProfessor({
    idProfessor: (await params).id,
  })

  return NextResponse.json(response)
}
