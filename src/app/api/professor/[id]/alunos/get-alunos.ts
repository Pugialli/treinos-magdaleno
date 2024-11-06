import { prisma } from '@/lib/prisma'

interface GetAlunosProps {
  idProfessor: string
}

export interface GetAlunosResponse {
  alunos:
    | {
        id: string
        idProfessor: string
        slug: string
        nome: string
        objetivo: string
        createdAt: string
      }[]
    | null
}

export async function getAlunos({ idProfessor }: GetAlunosProps) {
  const alunos = await prisma.aluno.findMany({
    where: {
      idProfessor,
    },
  })

  return {
    alunos,
  }
}
