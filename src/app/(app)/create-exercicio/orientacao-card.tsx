import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CircleMinus, CirclePlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Passo } from '@/utils/orientacao-passos'

export interface OrientacoesInputProps {
  step: Passo
  index: number
  errors: Record<string, string[]> | null
  addStep: () => void
  removeStep: (id: string) => void
  updateStep: (id: string, content: string) => void
}

export function OrientacaoCard({
  step,
  index,
  errors,
  addStep,
  removeStep,
  updateStep,
}: OrientacoesInputProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: step.id,
    data: {
      type: 'Passo',
      step,
    },
  })

  const style = { transition, transform: CSS.Transform.toString(transform) }

  if (isDragging) {
    return <Card ref={setNodeRef} style={style} className="flex h-28 gap-2" />
  }

  const orientacaoIndex = Number(step.id)

  return (
    <Card
      className="space-y-2 border-none bg-secondary/20 p-4"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="flex gap-2">
        <Label
          htmlFor={`orientacoes[${orientacaoIndex}].orientacao`}
          className="w-4"
        >
          {index + 1}.
        </Label>
        <Input
          name={`orientacoes[${orientacaoIndex}].ordem`}
          id={`orientacoes[${orientacaoIndex}].ordem`}
          type="hidden"
          defaultValue={index + 1}
        />
        <Textarea
          name={`orientacoes[${orientacaoIndex}].orientacao`}
          id={`orientacoes[${orientacaoIndex}].orientacao`}
          className="resize-none rounded border-secondary-foreground/50 bg-transparent focus:outline-none"
          defaultValue={step.orientacao}
          onChange={(e) => updateStep(step.id, e.target.value)}
        />
        <div className="flex items-center gap-2">
          <Button variant="default" size="icon" onClick={addStep} type="button">
            <CirclePlus className="size-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => removeStep(step.id)}
            disabled={index === 0}
            type="button"
          >
            <CircleMinus className="size-4" />
          </Button>
        </div>
      </div>
      {errors?.orientacoes && (
        <p className="px-6 text-xs font-medium text-red-500 dark:text-red-400">
          {errors.orientacoes[1]}
        </p>
      )}
    </Card>
  )
}
