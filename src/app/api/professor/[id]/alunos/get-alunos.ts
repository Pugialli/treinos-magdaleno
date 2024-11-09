import { prisma } from '@/lib/prisma'

interface GetAlunosProps {
  idProfessor: string
}

// export interface GetAlunosResponse {
//   id: string
//   idProfessor: string
//   slug: string
//   nome: string
//   objetivo: string
//   createdAt: string
// }

export async function getAlunos({ idProfessor }: GetAlunosProps) {
  return await prisma.aluno.findMany({
    where: {
      idProfessor,
    },
    include: {
      treinos: {
        select: {
          id: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
    orderBy: {
      nome: 'asc',
    },
  })
}
