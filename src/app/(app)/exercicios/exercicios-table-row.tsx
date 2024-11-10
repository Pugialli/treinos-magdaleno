'use client'

import { CircleX, ClipboardList, Dumbbell, Pencil, Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { DeleteAlunoDialog } from '@/components/delete-aluno-dialog'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import type { GetAlunosResponse } from '@/http/get-alunos'

interface AlunosTableRowProps {
  aluno: GetAlunosResponse
}

export function ExerciciosTablerow({ aluno }: AlunosTableRowProps) {
  const [open, setOpen] = useState(false)

  const treinoId = aluno.treinos.length > 0 ? aluno.treinos[0].id : ''

  return (
    <AlertDialog open={open} onOpenChange={setOpen} key={aluno.id}>
      <TableRow>
        <TableCell className="py-2.5">
          <div className="flex flex-col">
            <span className="inline-flex items-center gap-2">{aluno.nome}</span>
          </div>
        </TableCell>
        <TableCell className="py-2.5">
          <div className="flex flex-col">
            <span className="inline-flex items-center gap-2">
              {aluno.objetivo}
            </span>
          </div>
        </TableCell>
        <TableCell className="py-2.5">
          <div className="flex items-center justify-end gap-2">
            <Button
              size="icon"
              variant="outline"
              disabled={treinoId === ''}
              asChild={treinoId !== ''}
            >
              <Link href={`/aluno/${aluno.slug}/treino/${treinoId}`}>
                <Dumbbell className="size-4" />
              </Link>
            </Button>

            <Button size="icon" variant="outline" asChild>
              <Link href={`/aluno/${aluno.slug}`}>
                <ClipboardList className="size-4" />
              </Link>
            </Button>

            <Button size="icon" variant="outline" asChild>
              <Link href={`/create-treino?aluno=${aluno.slug}`}>
                <Plus className="size-4" />
              </Link>
            </Button>

            {/* <form action={removeMemberAction.bind(null, member.id)}>
                          <Button type="submit" size="sm" variant="destructive">
                            <UserMinus className="mr-2 size-4" />
                            Remove
                          </Button>
                        </form> */}
          </div>
        </TableCell>
        <TableCell className="py-2.5">
          <div className="flex items-center justify-end gap-2">
            <Button size="icon" variant="outline" asChild>
              <Link href={`/aluno/${aluno.slug}/edit`}>
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

      <DeleteAlunoDialog id={aluno.id} nome={aluno.nome} openFn={setOpen} />
    </AlertDialog>
  )
}
