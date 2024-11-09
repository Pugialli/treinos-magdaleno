import { getCurrentAlunos } from '@/auth/auth'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { AlunosTablerow } from './alunos-table-row'

export async function AlunosList() {
  const alunos = await getCurrentAlunos()

  return (
    <div className="space-y-2">
      <div className="rounded border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="rounded-tl-sm">Nome</TableHead>
              <TableHead>Objetivo</TableHead>
              <TableHead>Treinos</TableHead>
              <TableHead className="rounded-tr-sm">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alunos && alunos.length > 0 ? (
              alunos.map((aluno) => {
                return <AlunosTablerow key={aluno.id} aluno={aluno} />
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-muted-foreground"
                >
                  Sem alunos cadastrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
