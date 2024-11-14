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

import { createTreinoAction, updateTreinoAction } from './actions'

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

  const initialSteps: ExercicioFromTreino[] = initialData
    ? initialData.exercicios
    : [baseExercicioTreino]

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
    const ordemExercicio = exerciciosTreino.length + 1
    setExerciciosTreino((prevExerciciosTreino) => [
      ...prevExerciciosTreino,
      {
        ...baseExercicioTreino,
        ordem: ordemExercicio,
      },
    ])
  }

  function removeExercicio() {
    setExerciciosTreino((prevExerciciosTreino) =>
      prevExerciciosTreino.slice(0, -1),
    )
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
          {exerciciosTreino.map((exercicioTreino, index) => {
            return (
              <ExercicioTreinoInput
                key={index}
                exercicios={exercicios}
                exercicioTreino={exercicioTreino}
                errors={errors}
                addExercicio={addExercicio}
                removeExercicio={removeExercicio}
                index={index}
              />
            )
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
