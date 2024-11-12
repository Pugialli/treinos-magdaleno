'use client'

import {
  AlertTriangle,
  BadgeCheck,
  CircleMinus,
  CirclePlus,
  Loader2,
} from 'lucide-react'
import { useState } from 'react'

import type { GetExercicioResponse } from '@/app/api/exercicios/[id]/get-exercicio'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hooks/use-form-state'
import { orientacaoToPassos } from '@/utils/orientacao-passos'

import { createExercicioAction, updateExercicioAction } from './actions'

interface ExercicioFormProps {
  isUpdating?: boolean
  initialData?: GetExercicioResponse
}

export function ExercicioForm({
  isUpdating = false,
  initialData,
}: ExercicioFormProps) {
  const formAction = isUpdating ? updateExercicioAction : createExercicioAction

  const initialSteps = initialData
    ? orientacaoToPassos(initialData.orientacao)
    : [
        {
          ordem: 1,
          orientacao: '',
        },
      ]

  const [steps, setSteps] = useState(initialSteps)

  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState(formAction)

  function addStep() {
    setSteps((prevSteps) => [
      ...prevSteps,
      {
        ordem: prevSteps.length + 1,
        orientacao: '',
      },
    ])
  }

  function removeStep() {
    setSteps((prevSteps) => prevSteps.slice(0, -1))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Falha ao salvar um novo exercício!</AlertTitle>
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
      <Input
        name="idProfessor"
        id="idProfessor"
        type="hidden"
        defaultValue={initialData?.idProfessor}
      />

      <Input name="id" id="id" type="hidden" defaultValue={initialData?.id} />

      <div className="space-y-1">
        <Label htmlFor="nome">Nome</Label>
        <Input name="nome" id="nome" defaultValue={initialData?.nome} />
        {errors?.nome && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.nome[0]}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="categoria">Categoria</Label>
        <Input
          name="categoria"
          id="categoria"
          defaultValue={initialData?.categoria}
        />
        {errors?.categoria && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.categoria[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <div>Orientação</div>

        {steps.map((step, index) => (
          <div key={step.ordem}>
            <div className="flex gap-2">
              <Label
                htmlFor={`orientacoes[${index}].orientacao`}
                className="w-4"
              >
                {step.ordem}.
              </Label>
              <Input
                name={`orientacoes[${index}].ordem`}
                id={`orientacoes[${index}].ordem`}
                type="hidden"
                defaultValue={step.ordem}
              />
              <Textarea
                name={`orientacoes[${index}].orientacao`}
                id={`orientacoes[${index}].orientacao`}
                defaultValue={step.orientacao}
              />
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  size="icon"
                  onClick={addStep}
                  type="button"
                >
                  <CirclePlus className="size-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={removeStep}
                  disabled={step.ordem === 1}
                  type="button"
                >
                  <CircleMinus className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {errors?.orientacoes && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.orientacoes[0]}
          </p>
        )}
      </div>

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Salvar exercício'
        )}
      </Button>
    </form>
  )
}
