'use client'

import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { AlertTriangle, BadgeCheck, Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import type { GetExercicioResponse } from '@/app/api/exercicios/[id]/get-exercicio'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'
import { orientacaoToPassos, type Passo } from '@/utils/orientacao-passos'

import { createExercicioAction, updateExercicioAction } from './actions'
import { OrientacaoCard } from './orientacao-card'
import { OrientacaoCardOverlay } from './orientacao-card-overlay'

interface ExercicioFormProps {
  isUpdating?: boolean
  initialData?: GetExercicioResponse
}

export function ExercicioForm({
  isUpdating = false,
  initialData,
}: ExercicioFormProps) {
  const formAction = isUpdating ? updateExercicioAction : createExercicioAction

  const initialSteps: Passo[] = initialData
    ? orientacaoToPassos(initialData.orientacao)
    : [
        {
          id: crypto.randomUUID(),
          ordem: 1,
          orientacao: '',
        },
      ]

  const [steps, setSteps] = useState<Passo[]>(initialSteps)
  const stepsId = useMemo(() => steps.map((step) => step.id), [steps])

  const [activeStep, setActiveStep] = useState<Passo | null>(null)

  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState(formAction)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 3px
      },
    }),
  )

  function addStep() {
    setSteps((prevSteps) => [
      ...prevSteps,
      {
        id: crypto.randomUUID(),
        ordem: prevSteps.length + 1,
        orientacao: '',
      },
    ])
  }

  function removeStep() {
    setSteps((prevSteps) => prevSteps.slice(0, -1))
  }

  function updateStep(id: string, content: string) {
    setSteps((prevSteps) => {
      return prevSteps.map((step) => {
        console.log(step)
        if (step.id !== id) return step
        return {
          ...step,
          orientacao: content,
        }
      })
    })
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Passo') {
      setActiveStep(event.active.data.current.step)
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveStep(null)

    const { active, over } = event

    if (!over) return

    const activeStepId = active.id
    const overStepId = over.id

    if (activeStepId === overStepId) return

    setSteps((steps) => {
      const activeStepIndex = steps.findIndex(
        (step) => step.id === activeStepId,
      )

      const overStepIndex = steps.findIndex((step) => step.id === overStepId)

      return arrayMove(steps, activeStepIndex, overStepIndex)
    })
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
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <SortableContext items={stepsId}>
            {steps.map((step, index) => (
              <OrientacaoCard
                key={step.id}
                index={index}
                step={step}
                addStep={addStep}
                removeStep={removeStep}
                updateStep={updateStep}
              />
            ))}
            {errors?.orientacoes && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.orientacoes[0]}
              </p>
            )}
          </SortableContext>
          {createPortal(
            <DragOverlay>
              {activeStep && <OrientacaoCardOverlay step={activeStep} />}
            </DragOverlay>,
            document.body,
          )}
        </DndContext>
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
