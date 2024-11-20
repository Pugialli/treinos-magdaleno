'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useFormState } from '@/hooks/use-form-state'
import { getAlunos } from '@/http/get-alunos'

import { duplicateTreinoAction } from './actions'

export interface DuplicateDialogProps {
  idTreino: string
  idProfessor: string
}

export function DuplicateDialog({
  idTreino,
  idProfessor,
}: DuplicateDialogProps) {
  const [{ errors }, handleSubmit, isPending] = useFormState(
    duplicateTreinoAction,
  )

  const [idAluno, setIdAluno] = useState('')

  const { data: alunos } = useQuery({
    queryKey: ['alunos', idProfessor],
    queryFn: () => getAlunos(idProfessor),
  })

  function handleChangeAluno(value: string) {
    setIdAluno(value)
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <form id={idTreino} onSubmit={handleSubmit}>
        <input type="hidden" name="idTreino" defaultValue={idTreino} />
        <DialogHeader>
          <DialogTitle>Duplicar Treino</DialogTitle>
          <DialogDescription>
            Selecione o aluno para quem esse treino deve ser duplicado.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1 py-4">
          <Label htmlFor="idAluno">Aluno</Label>
          <input
            type="hidden"
            id="idAluno"
            name="idAluno"
            defaultValue={idAluno}
          />
          {alunos ? (
            <Select onValueChange={handleChangeAluno}>
              <SelectTrigger id="idAluno">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {alunos.map((aluno) => {
                  return (
                    <SelectItem key={aluno.id} value={aluno.id}>
                      {aluno.nome}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          ) : (
            <Skeleton className="h-10 w-full" />
          )}

          {errors?.idAluno && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.idAluno[0]}
            </p>
          )}
        </div>
        <DialogFooter>
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              'Duplicar treino'
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
