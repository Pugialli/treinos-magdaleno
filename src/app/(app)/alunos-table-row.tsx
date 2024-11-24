'use client'

import dayjs from 'dayjs'
import { CircleEllipsis } from 'lucide-react'

import { SheetActionsAluno } from '@/components/sheet-actions-aluno'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { TableCell, TableRow } from '@/components/ui/table'

import type { GetAlunosWithTreinoResponse } from '../api/professor/[id]/alunos/get-alunos'

interface AlunosTableRowProps {
  aluno: GetAlunosWithTreinoResponse
}

export function AlunosTablerow({ aluno }: AlunosTableRowProps) {
  const ultimoTreinoDate = aluno.treinos[aluno.treinos.length - 1].createdAt

  return (
    <Sheet key={aluno.id}>
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
          <div className="flex flex-col">
            <span className="inline-flex items-center gap-2">
              {dayjs(ultimoTreinoDate).format('DD/MM/YYYY')}
            </span>
          </div>
        </TableCell>
        <TableCell className="py-2.5">
          <div className="flex items-center justify-end gap-2">
            <SheetTrigger asChild>
              <Button size="icon" variant="tertiary">
                <CircleEllipsis className="size-6" />
              </Button>
            </SheetTrigger>
          </div>
        </TableCell>
      </TableRow>

      <SheetActionsAluno aluno={aluno} />
    </Sheet>
  )
}
