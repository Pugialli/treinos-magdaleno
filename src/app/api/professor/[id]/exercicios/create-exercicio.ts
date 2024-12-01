import { prisma } from '@/lib/prisma'

export interface CreateExercicioProps {
  nome: string
  categoria: string
  orientacao: string
  idProfessor: string
  fotos: {
    ordem: number
    avatarUrl: string
  }[]
}

export async function createExercicio({
  nome,
  categoria,
  orientacao,
  idProfessor,
  fotos,
}: CreateExercicioProps) {
  const exercicio = await prisma.exercicio.create({
    data: {
      nome,
      categoria,
      orientacao,
      idProfessor,
    },
  })

  fotos.map(async (foto) => {
    return await prisma.foto.create({
      data: {
        idExercicio: exercicio.id,
        ordem: foto.ordem,
        avatarUrl: foto.avatarUrl,
      },
    })
  })

  return exercicio
}
