import { NextResponse } from 'next/server'

import { getTreinos } from './get-treinos'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const treinos = await getTreinos({ slug: (await params).slug })

  return NextResponse.json(treinos)
}
