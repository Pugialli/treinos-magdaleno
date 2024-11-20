import {
  CircleChevronDown,
  CircleChevronUp,
  CircleMinus,
  CirclePlus,
} from 'lucide-react'
import { useState } from 'react'

import type { GetExercicioResponse } from '@/app/api/exercicios/[id]/get-exercicio'
import type { ExercicioFromTreino } from '@/app/api/treinos/[id]/get-treino'
import { InputWithLabel } from '@/components/input-with-label'
import { SelectExercicio } from '@/components/select-exercicio'
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export interface ExercicioTreinoInputProps {
  exercicios: GetExercicioResponse[]
  exercicioTreino: ExercicioFromTreino
  indexExercicio: number
  indexConjugado: number
  errors: Record<string, string[]> | null
  addExercicio: () => void
  addExercicioToConjugado: (conjugadoIndex: number) => void
  addConjugado: () => void
  removeExercicio: (conjugadoIndex: number, exercicioIndex: number) => void
  moveConjugadoUp: (conjugadoIndex: number) => void
  moveConjugadoDown: (conjugadoIndex: number) => void
  moveExerciseUp: (conjugadoIndex: number, exercicioIndex: number) => void
  moveExerciseDown: (conjugadoIndex: number, exercicioIndex: number) => void
  isConjugado?: boolean
  isLast: boolean
}

export function ExercicioTreinoInput({
  exercicios,
  exercicioTreino,
  indexExercicio,
  indexConjugado,
  errors,
  isLast,
  addExercicio,
  addExercicioToConjugado,
  addConjugado,
  removeExercicio,
  moveExerciseUp,
  moveExerciseDown,
  moveConjugadoUp,
  moveConjugadoDown,
  isConjugado = false,
}: ExercicioTreinoInputProps) {
  const initialData = {
    id: exercicioTreino.id || '',
    nome: exercicioTreino.exercicio.nome || '',
    idExercicio: exercicioTreino.exercicio.id || '',
    carga: exercicioTreino.carga,
    isometriaMin: exercicioTreino.isometriaMin,
    isometriaSeg: exercicioTreino.isometriaSeg,
    descansoMin: exercicioTreino.descansoMin,
    descansoSeg: exercicioTreino.descansoSeg,
    repeticoes: exercicioTreino.repeticoes,
    series: exercicioTreino.series,
    obs: exercicioTreino.obs || '',
  }

  const [idExercicio, setIdExercicio] = useState(initialData.idExercicio)

  const ordem = isConjugado
    ? `${indexConjugado + 1}.${indexExercicio + 1}`
    : `${indexConjugado + 1}`

  return (
    <Card className="space-y-4 p-4">
      <CardTitle className="flex items-start gap-4">
        <input
          type="hidden"
          name={`exercicios[${indexConjugado}][${indexExercicio}].id`}
          defaultValue={exercicioTreino.id}
        />

        <div>
          <span>{ordem}.</span>
          <div className="flex gap-1">
            <Button
              variant="link"
              size="xs"
              onClick={
                isConjugado
                  ? () => moveExerciseUp(indexConjugado, indexExercicio)
                  : () => moveConjugadoUp(indexConjugado)
              }
              type="button"
              className="px-0"
              disabled={
                isConjugado ? indexExercicio === 0 : indexConjugado === 0
              }
            >
              <CircleChevronUp className="size-4" />
            </Button>
            <Button
              variant="link"
              size="xs"
              onClick={
                isConjugado
                  ? () => moveExerciseDown(indexConjugado, indexExercicio)
                  : () => moveConjugadoDown(indexConjugado)
              }
              type="button"
              className="px-0"
              disabled={isLast}
            >
              <CircleChevronDown className="size-4" />
            </Button>
          </div>
        </div>
        <div className="w-full space-y-1">
          <Input
            type="hidden"
            name={`exercicios[${indexConjugado}][${indexExercicio}].idExercicio`}
            defaultValue={idExercicio}
          />

          <SelectExercicio
            exercicios={exercicios}
            setIdExercicio={setIdExercicio}
            initialData={initialData.nome}
          />
          {errors?.[
            `exercicios[${indexConjugado}][${indexExercicio}].idExercicio`
          ] && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {
                errors[
                  `exercicios[${indexConjugado}][${indexExercicio}].idExercicio`
                ]
              }
            </p>
          )}
        </div>
      </CardTitle>
      <div className="space-y-4">
        <div className="flex justify-between gap-4">
          <div className="space-y-1">
            <Label htmlFor={`${indexConjugado}.carga`}>Carga</Label>
            <InputWithLabel
              type="number"
              id={`${indexConjugado}.carga`}
              name={`exercicios[${indexConjugado}][${indexExercicio}].carga`}
              defaultValue={initialData.carga || undefined}
              label="kgs"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`${indexConjugado}.isometriaMin`}>Isometria</Label>
            <div className="flex gap-1">
              <InputWithLabel
                type="number"
                id={`${indexConjugado}.isometriaMin`}
                name={`exercicios[${indexConjugado}][${indexExercicio}].isometriaMin`}
                defaultValue={initialData.isometriaMin || undefined}
                label="m"
              />
              <InputWithLabel
                type="number"
                name={`exercicios[${indexConjugado}][${indexExercicio}].isometriaSeg`}
                defaultValue={initialData.isometriaSeg || undefined}
                label="s"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor={`${indexConjugado}.descansoMin`}>Descanso</Label>
            <div className="flex gap-1">
              <InputWithLabel
                type="number"
                id={`${indexConjugado}.descansoMin`}
                name={`exercicios[${indexConjugado}][${indexExercicio}].descansoMin`}
                defaultValue={initialData.descansoMin || undefined}
                label="m"
              />
              <InputWithLabel
                type="number"
                name={`exercicios[${indexConjugado}][${indexExercicio}].descansoSeg`}
                defaultValue={initialData.descansoSeg || undefined}
                label="s"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <div className="space-y-1">
            <Label htmlFor={`${indexConjugado}.repeticoes`}>Repetições</Label>
            <Input
              type="number"
              id={`${indexConjugado}.repeticoes`}
              name={`exercicios[${indexConjugado}][${indexExercicio}].repeticoes`}
              defaultValue={initialData.repeticoes || undefined}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor={`${indexConjugado}.series`}>Séries</Label>
            <Input
              type="number"
              id={`${indexConjugado}.series`}
              name={`exercicios[${indexConjugado}][${indexExercicio}].series`}
              defaultValue={initialData.series}
            />
            {errors?.[
              `exercicios[${indexConjugado}][${indexExercicio}].series`
            ] && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {
                  errors[
                    `exercicios[${indexConjugado}][${indexExercicio}].series`
                  ][0]
                }
              </p>
            )}
          </div>
        </div>
        <div className="flex items-end gap-4">
          <div className="w-full space-y-1">
            <Label htmlFor={`${indexConjugado}.obs`}>
              Observações para esse exercício
            </Label>
            <Input
              id={`${indexConjugado}.obs`}
              name={`exercicios[${indexConjugado}][${indexExercicio}].obs`}
              defaultValue={initialData.obs}
            />
          </div>
        </div>
        <div className="flex items-end gap-4">
          <div className="flex w-full justify-between">
            <Button
              variant="default"
              size="xs"
              onClick={
                isConjugado
                  ? () => addExercicioToConjugado(indexConjugado)
                  : () => addExercicio()
              }
              type="button"
            >
              <CirclePlus className="size-4" /> Exercício
            </Button>
            {indexConjugado !== 0 && (
              <Button
                variant="destructive"
                size="xs"
                onClick={() => removeExercicio(indexConjugado, indexExercicio)}
                type="button"
                disabled={indexConjugado === 0}
              >
                <CircleMinus className="size-4" /> Exercício
              </Button>
            )}
            <Button
              variant="secondary"
              size="xs"
              onClick={addConjugado}
              type="button"
            >
              <CirclePlus className="size-4" /> Conjugado
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
