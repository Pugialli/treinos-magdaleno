'use client'

import { type DragEndEvent, type DragStartEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import {
  AlertTriangle,
  ArrowUpDown,
  BadgeCheck,
  Loader2,
  X,
} from 'lucide-react'
import { CldImage, CldUploadWidget } from 'next-cloudinary'
import { useMemo, useState } from 'react'

import type { GetExercicioResponse } from '@/app/api/exercicios/[id]/get-exercicio'
import {
  ReorderDialog,
  ReorderDialogContent,
  ReorderDialogContext,
  ReorderDialogDescription,
  ReorderDialogHeader,
  ReorderDialogItem,
  ReorderDialogItemOverlay,
  ReorderDialogTitle,
  ReorderDialogTrigger,
} from '@/components/reorder-dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'
import { orientacaoToPassos, type Passo } from '@/utils/orientacao-passos'

import { createExercicioAction, updateExercicioAction } from './actions'
import { OrientacaoCard } from './orientacao-card'
import { OrientacaoCardFixed } from './orientacao-card-fixed'

interface ExercicioFormProps {
  isUpdating?: boolean
  initialData?: GetExercicioResponse
}

interface UploadInfo {
  asset_id: string
  url: string
}

interface CloudinaryResponse {
  files: {
    uploadInfo: UploadInfo
  }[]
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
          id: '1',
          ordem: 1,
          orientacao: '',
        },
      ]

  const [steps, setSteps] = useState<Passo[]>(initialSteps)
  const stepsId = useMemo(() => steps.map((step) => step.id), [steps])

  const [imageUrls, setImageUrls] = useState<UploadInfo[]>([])

  const [activeStep, setActiveStep] = useState<Passo | null>(null)

  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState(formAction)

  function addStep() {
    setSteps((prevSteps) => {
      const nextId = Number(prevSteps[prevSteps.length - 1].id) + 1
      return [
        ...prevSteps,
        {
          id: nextId.toString(),
          ordem: prevSteps.length + 1,
          orientacao: '',
        },
      ]
    })
  }

  function removeStep(id: string) {
    setSteps((prevSteps) => prevSteps.filter((step) => step.id !== id))
  }

  function removeImage(id: string) {
    console.log(id)
  }

  function updateStep(id: string, content: string) {
    setSteps((prevSteps) => {
      return prevSteps.map((step) => {
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
      setActiveStep(event.active.data.current.sortableItem)
    } else {
      setActiveStep(null)
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

    setSteps((steps) => {
      return steps.map((step, index) => {
        return { ...step, ordem: index + 1 }
      })
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
        <div className="flex items-center gap-2">
          <div>Orientação</div>
          <ReorderDialog>
            <ReorderDialogTrigger asChild>
              <Button variant="default" size="sm" type="button">
                <ArrowUpDown className="size-4" /> Reordenar passos
              </Button>
            </ReorderDialogTrigger>
            <ReorderDialogContent>
              <ReorderDialogHeader>
                <ReorderDialogTitle>Reordenar Orientações</ReorderDialogTitle>
                <ReorderDialogDescription>
                  Ordene abaixo como preferir
                </ReorderDialogDescription>
              </ReorderDialogHeader>
              <ReorderDialogContext
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              >
                <SortableContext items={stepsId}>
                  {steps.map((step, index) => (
                    <ReorderDialogItem
                      key={step.id}
                      sortableItem={step}
                      type="Passo"
                      className="flex h-12 gap-2 bg-secondary/20 p-4"
                    >
                      <OrientacaoCardFixed index={index + 1} step={step} />
                    </ReorderDialogItem>
                  ))}
                </SortableContext>
                {activeStep && (
                  <ReorderDialogItemOverlay
                    sortableItem={activeStep}
                    type="Passo"
                    className="flex h-12 gap-2 p-4"
                  >
                    <OrientacaoCardFixed step={activeStep} />
                  </ReorderDialogItemOverlay>
                )}
              </ReorderDialogContext>
            </ReorderDialogContent>
          </ReorderDialog>
        </div>
        {steps.map((step, index) => (
          <OrientacaoCard
            key={step.id}
            index={index}
            step={step}
            errors={errors}
            addStep={addStep}
            removeStep={removeStep}
            updateStep={updateStep}
          />
        ))}
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div>Fotos</div>
        </div>
        <CldUploadWidget
          signatureEndpoint="/api/sign-image"
          options={{
            sources: [
              'local',
              'google_drive',
              'instagram',
              'facebook',
              'dropbox',
            ],
          }}
          onQueuesEnd={({ info, event }, { widget }) => {
            if (event === 'queues-end') {
              const filesUploaded = info as unknown as CloudinaryResponse
              const newImages = imageUrls
              filesUploaded.files.map((file) => {
                return newImages.push(file.uploadInfo)
              })
              setImageUrls(newImages)
            }
            widget.close()
          }}
        >
          {({ open }) => {
            function handleOnClick() {
              setImageUrls([])
              open()
            }
            return (
              <Button variant="tertiary" onClick={handleOnClick}>
                Adicionar imagem
              </Button>
            )
          }}
        </CldUploadWidget>
        <div className="flex w-full flex-col gap-4">
          {imageUrls.length > 0 &&
            imageUrls.map((image, index) => {
              return (
                <Card key={image.asset_id} className="flex gap-2">
                  <CardTitle>{index + 1}.</CardTitle>
                  <CardContent>
                    <input
                      name={`fotos[${index}].ordem`}
                      type="hidden"
                      defaultValue={index + 1}
                    />
                    <input
                      name={`fotos[${index}].avatarUrl`}
                      type="hidden"
                      defaultValue={image.url}
                    />
                    <CldImage src={image.url} width={280} height={280} alt="" />
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeImage(image.asset_id)}
                      disabled={index === 0}
                      type="button"
                    >
                      <X className="size-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
        </div>
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
