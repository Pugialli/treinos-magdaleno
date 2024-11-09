'use client'

import { useQuery } from '@tanstack/react-query'
import { AlertTriangle, BadgeCheck, Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hooks/use-form-state'
import { getAluno } from '@/http/get-aluno'
import { getAlunos } from '@/http/get-alunos'
import { queryClient } from '@/lib/react-query'

import { createTreinoAction } from './actions'

interface TreinoFormProps {
  idProfessor: string
}

export function TreinoForm({ idProfessor }: TreinoFormProps) {
  const searchParams = useSearchParams()

  const alunoSlug = searchParams.get('aluno')

  const { data: currentAluno } = useQuery({
    queryKey: ['aluno', alunoSlug],
    queryFn: () => getAluno(alunoSlug),
    enabled: !!alunoSlug,
  })

  const { data: alunos } = useQuery({
    queryKey: ['alunos', currentAluno?.idProfessor],
    queryFn: () => getAlunos(idProfessor),
  })

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    createTreinoAction,
    () => {
      queryClient.invalidateQueries({
        queryKey: [alunoSlug, 'treinos'],
      })
    },
  )

  // const currentProject =
  //   data && projectSlug
  //     ? data.projects.find((project) => project.slug === projectSlug)
  //     : null

  const defaultAluno = currentAluno ? currentAluno.id : ''

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Falha ao salvar um novo treino!</AlertTitle>
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
      <div className="space-y-1">
        <Label htmlFor="aluno">Aluno</Label>
        {alunos ? (
          <Select name="aluno" defaultValue={defaultAluno}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {alunos &&
                alunos.map((aluno) => {
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
        {errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" id="description" />

        {errors?.description && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.description[0]}
          </p>
        )}
      </div>

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Salvar treino'
        )}
      </Button>
    </form>
  )
}
