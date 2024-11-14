import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { duplicateTreinoAction } from '@/app/(app)/aluno/[slug]/actions'
import { useFormState } from '@/hooks/use-form-state'
import { getAlunos } from '@/http/get-alunos'

import { Button } from './ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Skeleton } from './ui/skeleton'

export interface DuplicateDialogProps {
  idTreino: string
  idProfessor: string
  errors: Record<string, string[]> | null
}

export function DuplicateDialog({
  idTreino,
  idProfessor,
}: DuplicateDialogProps) {
  const [idAluno, setIdAluno] = useState('')

  const { data: alunos } = useQuery({
    queryKey: ['alunos', idProfessor],
    queryFn: () => getAlunos(idProfessor),
  })

  const [{ errors }, handleSubmit] = useFormState(duplicateTreinoAction)

  function handleChangeAluno(value: string) {
    setIdAluno(value)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="idTreino" defaultValue={idTreino} />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Duplicar Treino</DialogTitle>
          <DialogDescription>
            Selecione o aluno para quem esse treino deve ser duplicado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-1">
            <Label htmlFor="idAluno">Aluno</Label>
            <input type="hidden" name="idAluno" defaultValue={idAluno} />
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
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </form>
  )
}
