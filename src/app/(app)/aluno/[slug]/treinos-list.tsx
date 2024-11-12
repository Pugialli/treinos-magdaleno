import 'dayjs/locale/pt-br'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CopyPlus, Dumbbell } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getTreinos } from '@/http/get-treinos'

interface TreinosListProps {
  alunoSlug: string
}

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export async function TreinosList({ alunoSlug }: TreinosListProps) {
  const treinos = await getTreinos(alunoSlug)

  return (
    <div className="space-y-2">
      <div className="rounded border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="rounded-tl-sm">Criado</TableHead>
              <TableHead>Número de exercícios</TableHead>
              <TableHead className="rounded-tr-sm">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {treinos.length > 0 ? (
              treinos.map((treino) => {
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
                        <Button size="icon" variant="outline" asChild>
                          <Link
                            href={`/aluno/${alunoSlug}/treino/${treino.id}`}
                          >
                            <Dumbbell className="size-4" />
                          </Link>
                        </Button>

                        <Button size="icon" variant="outline" asChild>
                          <Link href="">
                            <CopyPlus className="size-4" />
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
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-muted-foreground"
                >
                  Sem treinos cadastrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
