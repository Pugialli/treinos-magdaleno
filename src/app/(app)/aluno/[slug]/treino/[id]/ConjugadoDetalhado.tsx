import type { ExercicioFromTreino } from '@/app/api/treinos/[id]/get-treino'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { ExercicioDetalhado } from './ExercicioDetalhado'

export interface ConjugadoDetalhadoProps {
  exercicios: ExercicioFromTreino[]
}

export function ConjugadoDetalhado({ exercicios }: ConjugadoDetalhadoProps) {
  return (
    <Card className="border-border bg-transparent">
      <CardHeader className="items-center">
        <CardTitle className="text-4xl font-extrabold text-primary">
          CONJUGADO
        </CardTitle>
      </CardHeader>
      <CardContent>
        {exercicios.map((exercicio) => {
          return (
            <div className="px-4 py-9" key={exercicio.id}>
              <ExercicioDetalhado exercicio={exercicio} />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
