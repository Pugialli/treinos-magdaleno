import { CircleMinus, CirclePlus } from 'lucide-react'
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
  index: number
  errors: Record<string, string[]> | null
  addExercicio: () => void
  removeExercicio: () => void
}

export function ExercicioTreinoInput({
  exercicios,
  exercicioTreino,
  index,
  errors,
  addExercicio,
  removeExercicio,
}: ExercicioTreinoInputProps) {
  const initialData = {
    id: exercicioTreino.id || '',
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

  return (
    <Card className="space-y-4 p-4">
      <CardTitle className="flex items-start gap-4">
        <Input
          type="hidden"
          name={`exercicios[${index}].id`}
          defaultValue={exercicioTreino.id}
        />

        <Input
          type="hidden"
          name={`exercicios[${index}].ordem`}
          defaultValue={exercicioTreino.ordem}
        />
        <span>{exercicioTreino.ordem}.</span>
        <div className="w-full space-y-1">
          <Input
            type="hidden"
            name={`exercicios[${index}].idExercicio`}
            defaultValue={idExercicio}
          />

          <SelectExercicio
            exercicios={exercicios}
            setIdExercicio={setIdExercicio}
            initialData={exercicioTreino.exercicio.nome}
          />
          {errors?.[`exercicios[${index}].idExercicio`] && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors[`exercicios[${index}].idExercicio`]}
            </p>
          )}
        </div>
      </CardTitle>
      <div className="space-y-4">
        <div className="flex justify-between gap-4">
          <div className="space-y-1">
            <Label htmlFor={`${index}.carga`}>Carga</Label>
            <InputWithLabel
              type="number"
              name={`exercicios[${index}].carga`}
              defaultValue={initialData.carga || undefined}
              label="kgs"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`${index}.isometriaMin`}>Isometria</Label>
            <div className="flex gap-1">
              <InputWithLabel
                type="number"
                name={`exercicios[${index}].isometriaMin`}
                defaultValue={initialData.isometriaMin || undefined}
                label="m"
              />
              <InputWithLabel
                type="number"
                name={`exercicios[${index}].isometriaSeg`}
                defaultValue={initialData.isometriaSeg || undefined}
                label="s"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor={`${index}.descansoMin`}>Descanso</Label>
            <div className="flex gap-1">
              <InputWithLabel
                type="number"
                name={`exercicios[${index}].descansoMin`}
                defaultValue={initialData.descansoMin || undefined}
                label="m"
              />
              <InputWithLabel
                type="number"
                name={`exercicios[${index}].descansoSeg`}
                defaultValue={initialData.descansoSeg || undefined}
                label="s"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <div className="space-y-1">
            <Label htmlFor={`${index}.repeticoes`}>Repetições</Label>
            <Input
              type="number"
              name={`exercicios[${index}].repeticoes`}
              id={`${index}.repeticoes`}
              defaultValue={initialData.repeticoes || undefined}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor={`${index}.series`}>Séries</Label>
            <Input
              type="number"
              name={`exercicios[${index}].series`}
              id={`${index}.series`}
              defaultValue={initialData.series}
            />
            {errors?.[`exercicios[${index}].series`] && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors[`exercicios[${index}].series`][0]}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-end gap-4">
          <div className="w-full space-y-1">
            <Label htmlFor={`${index}.obs`}>
              Observações para esse exercício
            </Label>
            <Input
              id={`${index}.obs`}
              name={`exercicios[${index}].obs`}
              defaultValue={initialData.obs}
            />
          </div>
        </div>
        <div className="flex items-end gap-4">
          <div className="flex w-full justify-between">
            <Button
              variant="default"
              size="xs"
              onClick={addExercicio}
              type="button"
            >
              <CirclePlus className="size-4" /> Adicionar exercício
            </Button>
            {index !== 0 && (
              <Button
                variant="destructive"
                size="xs"
                onClick={removeExercicio}
                type="button"
                disabled={index === 0}
              >
                <CircleMinus className="size-4" /> Remover exercício
              </Button>
            )}
            <Button
              variant="secondary"
              size="xs"
              onClick={addExercicio}
              type="button"
            >
              <CirclePlus className="size-4" /> Adicionar conjunto
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
