'use client'

import { useQuery } from '@tanstack/react-query'
import { AlertTriangle, BadgeCheck, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'

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

export function TreinoForm() {
  const { slug: alunoSlug } = useParams<{ slug: string }>()

  const { data: currentAluno } = useQuery({
    queryKey: ['aluno', alunoSlug],
    queryFn: () => getAluno(alunoSlug),
    enabled: !!alunoSlug,
  })

  const { data } = useQuery({
    queryKey: ['alunos', currentAluno?.idProfessor],
    queryFn: () => getAlunos(currentAluno!.idProfessor),
    enabled: !!currentAluno,
  })

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    createTreinoAction,
    () => {
      queryClient.invalidateQueries({
        queryKey: [alunoSlug, 'treinos'],
      })
    },
  )

  console.log(data)

  // const currentProject =
  //   data && projectSlug
  //     ? data.projects.find((project) => project.slug === projectSlug)
  //     : null

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
        {currentAluno && data ? (
          <Select name="aluno" defaultValue={currentAluno.id}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {data &&
                data.alunos.map((aluno) => {
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
          'Save project'
        )}
      </Button>
    </form>
  )
}
