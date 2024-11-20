import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CircleMinus, CirclePlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Passo } from '@/utils/orientacao-passos'

export interface OrientacoesInputProps {
  step: Passo
}

export function OrientacaoCardOverlay({ step }: OrientacoesInputProps) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: step.id,
      data: {
        type: 'Passo',
        step,
      },
    })

  const style = { transition, transform: CSS.Transform.toString(transform) }

  return (
    <Card
      className="flex gap-2 border-none bg-secondary/20 p-4"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Label htmlFor={`orientacoes[${step.id}].orientacao`} className="w-4">
        ?.
      </Label>
      <Textarea
        className="resize-none rounded border-secondary-foreground/50 bg-transparent focus:outline-none"
        defaultValue={step.orientacao}
      />
      <div className="flex items-center gap-2">
        <Button variant="default" size="icon" type="button">
          <CirclePlus className="size-4" />
        </Button>
        <Button variant="destructive" size="icon" type="button">
          <CircleMinus className="size-4" />
        </Button>
      </div>
    </Card>
  )
}
