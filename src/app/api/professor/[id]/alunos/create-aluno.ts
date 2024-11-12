import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'

export interface CreateAlunoProps {
  nome: string
  objetivo: string
  idProfessor: string
}

export async function createAluno({
  nome,
  objetivo,
  idProfessor,
}: CreateAlunoProps) {
  const slug = createSlug(nome)

  return await prisma.aluno.create({
    data: {
      nome,
      objetivo,
      idProfessor,
      slug,
    },
  })
}
