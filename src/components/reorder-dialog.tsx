'use client'

import { DndContext, type DndContextProps, DragOverlay } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  type HTMLAttributes,
} from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@/lib/utils'
import type { Passo } from '@/utils/orientacao-passos'

import { Card } from './ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

const ReorderDialog = Dialog

const ReorderDialogTrigger = DialogTrigger

const ReorderDialogHeader = DialogHeader

const ReorderDialogTitle = DialogTitle

const ReorderDialogDescription = DialogDescription

const ReorderDialogContent = forwardRef<
  ElementRef<typeof DialogContent>,
  ComponentPropsWithoutRef<typeof DialogContent>
>(({ className, children, ...props }, ref) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogContent ref={ref} className={cn(className)} {...props}>
        {children}
      </DialogContent>
    </DialogPortal>
  )
})
ReorderDialogContent.displayName = DialogContent.displayName

const ReorderDialogContext = ({ children, ...props }: DndContextProps) => {
  // const sensors = useSensors(useSensor(PointerSensor, {}))
  return (
    <DndContext
      // sensors={sensors}
      {...props}
    >
      {children}
    </DndContext>
  )
}
ReorderDialogContext.displayName = 'ReorderDialogContext'

interface ReorderDialogItemProps extends HTMLAttributes<HTMLDivElement> {
  sortableItem: Passo
  type: 'Passo'
}

const ReorderDialogItem = ({
  className,
  sortableItem,
  type,
  children,
  ...props
}: ReorderDialogItemProps) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: sortableItem.id,
    data: {
      type,
      sortableItem,
    },
  })

  const style = { transition, transform: CSS.Transform.toString(transform) }

  if (isDragging) {
    return (
      <Card
        ref={setNodeRef}
        style={style}
        className={cn('border-2 border-primary', className)}
      />
    )
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn('border-none', className)}
      {...props}
      {...attributes}
      {...listeners}
    >
      {children}
    </Card>
  )
}
ReorderDialogItem.displayName = 'ReorderDialogItem'

interface ReorderDialogItemOverlayProps extends HTMLAttributes<HTMLDivElement> {
  sortableItem: Passo
  type: 'Passo'
}

const ReorderDialogItemOverlay = ({
  className,
  children,
  sortableItem,
  type,
  ...props
}: ReorderDialogItemOverlayProps) => {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: sortableItem.id,
      data: {
        type,
        sortableItem,
      },
    })

  const style = { transition, transform: CSS.Transform.toString(transform) }
  return createPortal(
    <DragOverlay>
      <Card
        className={cn('border-2 border-primary', className)}
        ref={setNodeRef}
        style={style}
        {...props}
        {...attributes}
        {...listeners}
      >
        {children}
      </Card>
    </DragOverlay>,
    document.body,
  )
}
ReorderDialogItemOverlay.displayName = 'ReorderDialogItemOverlay'

export {
  ReorderDialog,
  ReorderDialogContent,
  ReorderDialogContext,
  ReorderDialogDescription,
  ReorderDialogHeader,
  ReorderDialogItem,
  ReorderDialogItemOverlay,
  ReorderDialogTitle,
  // eslint-disable-next-line prettier/prettier
  ReorderDialogTrigger
}
// eslint-disable-next-line prettier/prettier

