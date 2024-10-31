import { prisma } from '@/lib/prisma'

async function main() {
  const aluno1 = await prisma.aluno.create({
    data: { nome: 'Amanda Porto Padilha', objetivo: 'ficar monstrão' },
  })

  const aluno2 = await prisma.aluno.create({
    data: {
      nome: 'João Paulo Pugialli da Silva Souza',
      objetivo: 'não ficar zoado',
    },
  })

  const exercicios = await prisma.exercicio.createMany({
    data: [
      {
        nome: 'Abdominal bicicleta',
        categoria: 'barriga',
        orientacao:
          '1. Posicione-se no tapete de exercícios, deitado de costas com as mãos atrás da cabeça e os joelhos dobrados em direção ao peito.\n 2. Eleve as pernas, mantendo os joelhos em um ângulo de 90 graus.\n 3.Mantenha os cotovelos abertos para os lados e os ombros afastados das orelhas.\n 4.Faça o movimento idêntico ao de pedalar, levando o cotovelo oposto em direção ao joelho.',
      },
      {
        nome: 'Agachamento uni cross',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros.\n 2.Segure a barra na altura do quadril.\n 3.Agache-se, levando uma perna para trás.\n 4.Leve o joelho em direção ao chão.\n 5.Mantenha as costas retas e o joelho da frente alinhado com o pé.\n 6.Pressione os calcanhares para voltar à posição inicial. Repita do outro lado.',
      },
      {
        nome: 'Perdigueiro',
        categoria: 'barriga',
        orientacao:
          '1.Comece em uma posição de prancha com os braços estendidos e os pulsos diretamente sob os ombros.\n 2.Levante o braço direito e a perna esquerda ao mesmo tempo, mantendo o tronco estável e abdômen contraído.\n 3.Retorne à posição inicial e repita do outro lado.',
      },
    ],
  })

  const treino = await prisma.treino.create({
    data: {
      idAluno: aluno1.id,
    },
  })

  console.log({
    aluno1,
    aluno2,
    exercicios,
    treino,
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
