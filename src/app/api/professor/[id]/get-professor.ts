import { prisma } from '@/lib/prisma'

interface GetProfessorProps {
  id: string
}

export interface GetProfessorResponse {
  id: string
  name: string
  email: string
  avatarUrl: string | null
}

export async function getProfessor({ id }: GetProfessorProps) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  })
}
