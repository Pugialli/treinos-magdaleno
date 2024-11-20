'use client'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CircleX, CopyPlus, Dumbbell, Pencil } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import type { GetTreinoResponse } from '@/app/api/treinos/[id]/get-treino'
import { DeleteTreinoDialog } from '@/components/delete-treino-dialog'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { DuplicateDialog } from './duplicate-dialog'

export interface TreinoTableRowProps {
  treino: GetTreinoResponse
}

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function TreinoTableRow({ treino }: TreinoTableRowProps) {
  const [open, setOpen] = useState(false)

  return (
    <TableRow key={treino.id}>
      <TableCell className="py-2.5">
        <div className="flex flex-col">
          <span className="inline-flex items-center gap-2">
            {dayjs(treino.createdAt).fromNow()}
          </span>
        </div>
      </TableCell>
      <TableCell className="py-2.5">
        <div className="flex flex-col">
          <span className="inline-flex items-center gap-2">
            {treino.exercicios.length}
          </span>
        </div>
      </TableCell>
      <TableCell className="py-2.5">
        <div className="flex items-center gap-2">
          <Button type="button" size="icon" variant="outline" asChild>
            <Link href={`/aluno/${treino.aluno.slug}/treino/${treino.id}`}>
              <Dumbbell className="size-4" />
            </Link>
          </Button>
          <Button type="button" size="icon" variant="outline" asChild>
            <Link href={`/treinos/${treino.id}/edit`}>
              <Pencil className="size-4" />
            </Link>
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="outline">
                <CopyPlus className="size-4" />
              </Button>
            </DialogTrigger>
            <DuplicateDialog
              idProfessor={treino.aluno.idProfessor}
              idTreino={treino.id}
            />
          </Dialog>

          <AlertDialog open={open} onOpenChange={setOpen} key={treino.id}>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="destructive" className="p-0">
                <CircleX className="size-4" />
              </Button>
            </AlertDialogTrigger>

            <DeleteTreinoDialog
              id={treino.id}
              nome={treino.aluno.nome}
              createdDate={treino.createdAt}
              openFn={setOpen}
            />
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  )
}
