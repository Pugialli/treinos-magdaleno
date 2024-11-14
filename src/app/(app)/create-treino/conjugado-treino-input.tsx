import type { ReactNode } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export interface ConjugadoTreinoInputProps {
  children: ReactNode
}

export function ConjugadoTreinoInput({ children }: ConjugadoTreinoInputProps) {
  return (
    <Card className="border-border bg-transparent">
      <CardHeader className="items-center">
        <CardTitle className="text-4xl font-extrabold text-primary">
          CONJUGADO
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
