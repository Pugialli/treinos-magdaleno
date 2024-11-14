'use client'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CircleX, Pencil } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import type { GetTreinoFromProfessorResponse } from '@/app/api/professor/[id]/treinos/get-treinos-professor'
import { DeleteTreinoDialog } from '@/components/delete-treino-dialog'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

interface TreinosTableRowProps {
  treino: GetTreinoFromProfessorResponse
}

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function TreinosTablerow({ treino }: TreinosTableRowProps) {
  const [open, setOpen] = useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen} key={treino.id}>
      <TableRow>
        <TableCell className="py-2.5">
          <div className="flex flex-col">
            <span className="inline-flex items-center gap-2 text-nowrap">
              {dayjs(treino.createdAt).fromNow()}
            </span>
          </div>
        </TableCell>
        <TableCell className="py-2.5">
          <div className="flex flex-col">
            <span className="inline-flex items-center gap-2">
              {treino.aluno.nome}
            </span>
          </div>
        </TableCell>
        <TableCell className="py-2.5">
          <div className="flex flex-col">
            <span className="line-clamp-2">{treino.exercicios.length}</span>
          </div>
        </TableCell>
        <TableCell className="py-2.5">
          <div className="flex items-center justify-end gap-2">
            <Button size="icon" variant="outline" asChild>
              <Link href={`/treinos/${treino.id}/edit`}>
                <Pencil className="size-4" />
              </Link>
            </Button>

            <AlertDialogTrigger asChild>
              <Button size="icon" variant="destructive" className="p-0">
                <CircleX className="size-4" />
              </Button>
            </AlertDialogTrigger>

            {/* <form action={removeMemberAction.bind(null, member.id)}>
                          <Button type="submit" size="sm" variant="destructive">
                            <UserMinus className="mr-2 size-4" />
                            Remove
                          </Button>
                        </form> */}
          </div>
        </TableCell>
      </TableRow>

      <DeleteTreinoDialog
        id={treino.id}
        nome={treino.aluno.nome}
        createdDate={treino.createdAt}
        openFn={setOpen}
      />
    </AlertDialog>
  )
}
