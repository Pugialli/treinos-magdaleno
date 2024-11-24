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
      <div className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Objetivo</TableHead>
              <TableHead className="text-nowrap">Último treino</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-primary-foreground">
            {alunos && alunos.length > 0 ? (
              alunos.map((aluno) => {
                return <AlunosTablerow key={aluno.id} aluno={aluno} />
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
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
