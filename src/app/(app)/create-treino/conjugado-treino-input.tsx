import {
  CircleMinus,
  CirclePlus,
  SquareChevronDown,
  SquareChevronUp,
} from 'lucide-react'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export interface ConjugadoTreinoInputProps {
  index: number
  children: ReactNode
  isLast: boolean
  addExercicio: () => void
  removeConjugado: (conjugadoIndex: number) => void
  moveConjugadoUp: (conjugadoIndex: number) => void
  moveConjugadoDown: (conjugadoIndex: number) => void
}

export function ConjugadoTreinoInput({
  index,
  children,
  isLast,
  addExercicio,
  removeConjugado,
  moveConjugadoUp,
  moveConjugadoDown,
}: ConjugadoTreinoInputProps) {
  return (
    <Card className="border-border bg-transparent">
      <CardHeader>
        <CardTitle className="te text-4xl font-extrabold">
          <div className="flex gap-2">
            <span> {index + 1}.</span>
            <div className="flex gap-1">
              <Button
                variant="link"
                size="xs"
                onClick={() => moveConjugadoUp(index)}
                type="button"
                className="px-0"
                disabled={index === 0}
              >
                <SquareChevronUp className="size-4" />
              </Button>
              <Button
                variant="link"
                size="xs"
                onClick={() => moveConjugadoDown(index)}
                type="button"
                className="px-0"
                disabled={isLast}
              >
                <SquareChevronDown className="size-4" />
              </Button>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">{children}</CardContent>
      <CardFooter className="justify-between">
        <Button
          variant="default"
          size="xs"
          onClick={addExercicio}
          type="button"
        >
          <CirclePlus className="size-4" /> Exercício
        </Button>
        <Button
          variant="destructive"
          size="xs"
          onClick={() => removeConjugado(index)}
          type="button"
          disabled={index === 0}
        >
          <CircleMinus className="size-4" /> Conjugado
        </Button>
      </CardFooter>
    </Card>
  )
}
