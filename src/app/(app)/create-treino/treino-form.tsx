'use client'

import { useQuery } from '@tanstack/react-query'
import { AlertTriangle, BadgeCheck, Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ExercicioTreinoInput } from '@/app/(app)/create-treino/exercicio-treino-input'
import type { GetExercicioResponse } from '@/app/api/exercicios/[id]/get-exercicio'
import type { GetAlunosWithTreinoResponse } from '@/app/api/professor/[id]/alunos/get-alunos'
import type {
  ExercicioFromTreino,
  GetTreinoResponse,
} from '@/app/api/treinos/[id]/get-treino'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useFormState } from '@/hooks/use-form-state'
import { getAluno } from '@/http/get-aluno'
import { swapConjugado, swapExercicioInConjugado } from '@/utils/switch-array'
import { groupByOrder } from '@/utils/transform-conjugado'

import { createTreinoAction, updateTreinoAction } from './actions'
import { ConjugadoTreinoInput } from './conjugado-treino-input'

interface TreinoFormProps {
  alunos: GetAlunosWithTreinoResponse[]
  exercicios: GetExercicioResponse[]
  isUpdating?: boolean
  initialData?: GetTreinoResponse
}

const baseExercicioTreino: ExercicioFromTreino = {
  id: '',
  ordem: 1,
  carga: null,
  repeticoes: null,
  series: 1,
  descansoMin: null,
  descansoSeg: null,
  isometriaMin: null,
  isometriaSeg: null,
  obs: null,
  exercicio: {
    id: '',
    nome: '',
    categoria: '',
    orientacao: '',
    fotos: [],
  },
}

export function TreinoForm({
  alunos,
  exercicios,
  isUpdating = false,
  initialData,
}: TreinoFormProps) {
  const searchParams = useSearchParams()
  const alunoSlug = searchParams.get('aluno')

  const { data: currentAluno } = useQuery({
    queryKey: ['aluno', alunoSlug],
    queryFn: () => getAluno(alunoSlug),
    enabled: !!alunoSlug,
  })

  const formAction = isUpdating ? updateTreinoAction : createTreinoAction

  const initialSteps: ExercicioFromTreino[][] = initialData
    ? groupByOrder(initialData.exercicios)
    : [[baseExercicioTreino]]

  const [exerciciosTreino, setExerciciosTreino] = useState(initialSteps)

  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState(formAction)

  const [idAluno, setIdAluno] = useState<string | undefined>(
    initialData ? initialData.aluno.id : undefined,
  )

  useEffect(() => {
    if (currentAluno) {
      setIdAluno(currentAluno.id)
    }
  }, [currentAluno])

  function addExercicio() {
    setExerciciosTreino((prevExerciciosTreino) => [
      ...prevExerciciosTreino,
      [{ ...baseExercicioTreino, ordem: prevExerciciosTreino.length + 1 }],
    ])
  }

  function addConjugado() {
    setExerciciosTreino((prevExerciciosTreino) => [
      ...prevExerciciosTreino,
      [
        { ...baseExercicioTreino, ordem: prevExerciciosTreino.length + 1 },
        { ...baseExercicioTreino, ordem: prevExerciciosTreino.length + 1.1 },
      ],
    ])
  }

  function addExercicioToConjugado(conjugadoIndex: number) {
    setExerciciosTreino((prevExerciciosTreino) => {
      const updated = [...prevExerciciosTreino]
      const lastOrder = updated[conjugadoIndex].length
      const newExercicio = { ...baseExercicioTreino, ordem: lastOrder + 1 }

      updated[conjugadoIndex] = [...updated[conjugadoIndex], newExercicio]
      return updated
    })
  }

  function removeExercicio(conjugadoIndex: number, exercicioIndex: number) {
    setExerciciosTreino((prevExerciciosTreino) => {
      const updated = [...prevExerciciosTreino]
      updated[conjugadoIndex] = updated[conjugadoIndex].filter(
        (_, index) => index !== exercicioIndex,
      )

      if (updated[conjugadoIndex].length === 0) {
        updated.splice(conjugadoIndex, 1)
      }

      return updated
    })
  }

  function removeConjugado(conjugadoIndex: number) {
    setExerciciosTreino((prevExerciciosTreino) =>
      prevExerciciosTreino.filter((_, index) => index !== conjugadoIndex),
    )
  }

  function subirExercicioNoConjugado(
    conjugadoIndex: number,
    exercicioIndex: number,
  ) {
    const updated = swapExercicioInConjugado(
      exerciciosTreino,
      exercicioIndex - 1,
      exercicioIndex,
      conjugadoIndex,
    )
    setExerciciosTreino(updated)
  }

  function descerExercicioNoConjugado(
    conjugadoIndex: number,
    exercicioIndex: number,
  ) {
    const updated = swapExercicioInConjugado(
      exerciciosTreino,
      exercicioIndex,
      exercicioIndex + 1,
      conjugadoIndex,
    )
    setExerciciosTreino(updated)
  }

  function subirConjugado(conjugadoIndex: number) {
    const updated = swapConjugado(
      exerciciosTreino,
      conjugadoIndex,
      conjugadoIndex - 1,
    )
    setExerciciosTreino(updated)
  }

  function descerConjugado(conjugadoIndex: number) {
    const updated = swapConjugado(
      exerciciosTreino,
      conjugadoIndex,
      conjugadoIndex + 1,
    )
    setExerciciosTreino(updated)
  }

  function handleChangeAluno(value: string) {
    setIdAluno(value)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Falha ao salvar um novo treino!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      {success === true && message && (
        <Alert variant="success">
          <BadgeCheck className="size-4" />
          <AlertTitle>Sucesso!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <input
        type="hidden"
        name="idTreino"
        value={initialData ? initialData.id : undefined}
      />

      <div className="space-y-1">
        <Label htmlFor="idAluno">Aluno</Label>
        <input type="hidden" name="idAluno" defaultValue={idAluno} />
        {alunoSlug === null || currentAluno ? (
          <Select
            defaultValue={currentAluno ? currentAluno.id : idAluno}
            onValueChange={handleChangeAluno}
          >
            <SelectTrigger id="idAluno">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {alunos.map((aluno) => {
                return (
                  <SelectItem key={aluno.id} value={aluno.id}>
                    {aluno.nome}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        ) : (
          <Skeleton className="h-10 w-full" />
        )}

        {errors?.idAluno && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.idAluno[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <div>Exercícios</div>

        <div className="space-y-2">
          {exerciciosTreino.map((exercicioTreinoConjugado, indexConjugado) => {
            if (exercicioTreinoConjugado.length > 1) {
              return (
                <ConjugadoTreinoInput
                  key={indexConjugado}
                  index={indexConjugado}
                  isLast={exerciciosTreino.length - 1 === indexConjugado}
                  addExercicio={addExercicio}
                  removeConjugado={removeConjugado}
                  moveConjugadoUp={subirConjugado}
                  moveConjugadoDown={descerConjugado}
                >
                  {exercicioTreinoConjugado.map(
                    (exercicioTreino, indexExercicio) => {
                      return (
                        <ExercicioTreinoInput
                          key={indexExercicio}
                          indexExercicio={indexExercicio}
                          indexConjugado={indexConjugado}
                          exercicios={exercicios}
                          exercicioTreino={exercicioTreino}
                          isLast={
                            exercicioTreinoConjugado.length - 1 ===
                            indexExercicio
                          }
                          errors={errors}
                          addConjugado={addConjugado}
                          addExercicio={addExercicio}
                          addExercicioToConjugado={addExercicioToConjugado}
                          removeExercicio={removeExercicio}
                          moveConjugadoUp={subirConjugado}
                          moveConjugadoDown={descerConjugado}
                          moveExerciseUp={subirExercicioNoConjugado}
                          moveExerciseDown={descerExercicioNoConjugado}
                          isConjugado
                        />
                      )
                    },
                  )}
                </ConjugadoTreinoInput>
              )
            } else {
              return (
                <ExercicioTreinoInput
                  key={indexConjugado}
                  indexExercicio={0}
                  indexConjugado={indexConjugado}
                  exercicios={exercicios}
                  exercicioTreino={exercicioTreinoConjugado[0]}
                  isLast={exerciciosTreino.length - 1 === indexConjugado}
                  errors={errors}
                  addConjugado={addConjugado}
                  addExercicio={addExercicio}
                  addExercicioToConjugado={addExercicioToConjugado}
                  removeExercicio={removeExercicio}
                  moveConjugadoUp={subirConjugado}
                  moveConjugadoDown={descerConjugado}
                  moveExerciseUp={subirExercicioNoConjugado}
                  moveExerciseDown={descerExercicioNoConjugado}
                />
              )
            }
          })}
        </div>
      </div>

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Salvar treino'
        )}
      </Button>
    </form>
  )
}
