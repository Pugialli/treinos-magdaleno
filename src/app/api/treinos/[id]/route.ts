import { NextResponse } from 'next/server'

import { getTreino } from './get-treino'

interface TreinoProps {
  id: string
}

export async function GET(request: Request, context: { params: TreinoProps }) {
  const treino = await getTreino({ id: context.params.id })

  return NextResponse.json(treino)
}
