import { NextResponse } from 'next/server'

import { seedDB } from './createSeed'

export async function GET() {
  const seed = await seedDB()

  return NextResponse.json(seed, { status: 200 })
}
