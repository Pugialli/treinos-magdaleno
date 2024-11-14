import { hash } from 'bcryptjs'

import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'

export async function createTreino(idTreino: string) {
  const exercicio1 = await prisma.exercicio.findMany({
    where: {
      nome: 'Remada prone barra',
    },
  })

  const exercicio2 = await prisma.exercicio.findMany({
    where: {
      nome: 'Remada sup barra',
    },
  })

  const exercicio3 = await prisma.exercicio.findMany({
    where: {
      nome: 'Abdominal bicicleta',
    },
  })

  const exercicio4 = await prisma.exercicio.findMany({
    where: {
      nome: 'Cadeira do desespero',
    },
  })

  const exercicio5 = await prisma.exercicio.findMany({
    where: {
      nome: 'Conjugado AOP',
    },
  })

  const fotos = await prisma.foto.createMany({
    data: [
      {
        idExercicio: exercicio1[0].id,
        ordem: 1,
        avatarUrl:
          'https://res.cloudinary.com/padialli/image/upload/v1730403326/REMADA_PRONE_BARRA_1_fpsyv5.jpg',
      },
      {
        idExercicio: exercicio1[0].id,
        ordem: 2,
        avatarUrl:
          'https://res.cloudinary.com/padialli/image/upload/v1730403297/REMADA_PRONE_BARRA_2_tfvzmf.jpg',
      },
      {
        idExercicio: exercicio2[0].id,
        ordem: 1,
        avatarUrl:
          'https://res.cloudinary.com/padialli/image/upload/v1730403327/REMADA_SUP_BARRA_1_cjojwl.jpg',
      },
      {
        idExercicio: exercicio2[0].id,
        ordem: 2,
        avatarUrl:
          'https://res.cloudinary.com/padialli/image/upload/v1730403328/REMADA_SUP_BARRA_2_wmvsu3.jpg',
      },
      {
        idExercicio: exercicio3[0].id,
        ordem: 1,
        avatarUrl:
          'https://res.cloudinary.com/padialli/image/upload/v1730403281/ABDOMINAL_BICICLETA_1_b4ixbn.jpg',
      },
      {
        idExercicio: exercicio3[0].id,
        ordem: 2,
        avatarUrl:
          'https://res.cloudinary.com/padialli/image/upload/v1730403281/ABDOMINAL_BICICLETA_2_dortsd.jpg',
      },
      {
        idExercicio: exercicio4[0].id,
        ordem: 1,
        avatarUrl:
          'https://res.cloudinary.com/padialli/image/upload/v1730403288/CADEIRA_DO_DESESPERO_1_op7pwx.jpg',
      },
      {
        idExercicio: exercicio5[0].id,
        ordem: 1,
        avatarUrl:
          'https://res.cloudinary.com/padialli/image/upload/v1730403315/CONJUGADO_AOP_1_ohlq77.jpg',
      },
      {
        idExercicio: exercicio5[0].id,
        ordem: 2,
        avatarUrl:
          'https://res.cloudinary.com/padialli/image/upload/v1730403288/CONJUGADO_AOP_2_o4fefi.jpg',
      },
      {
        idExercicio: exercicio5[0].id,
        ordem: 3,
        avatarUrl:
          'https://res.cloudinary.com/padialli/image/upload/v1730403316/CONJUGADO_AOP_3_rxjplh.jpg',
      },
      {
        idExercicio: exercicio5[0].id,
        ordem: 4,
        avatarUrl:
          'https://res.cloudinary.com/padialli/image/upload/v1730403319/CONJUGADO_AOP_4_jrdons.jpg',
      },
    ],
  })

  const exercicioTreino = await prisma.exercicioTreino.createMany({
    data: [
      {
        idTreino,
        idExercicio: exercicio1[0].id,
        ordem: 1.1,
        carga: 25,
        isometriaSeg: 5,
        repeticoes: 3,
        series: 10,
        descansoSeg: 30,
        obs: 'lembrar de manter o cotovelo reto',
      },
      {
        idTreino,
        idExercicio: exercicio2[0].id,
        ordem: 1.2,
        carga: 30,
        repeticoes: 3,
        series: 5,
        descansoSeg: 30,
        obs: 'lembrar de manter o cotovelo reto',
      },
      {
        idTreino,
        idExercicio: exercicio3[0].id,
        ordem: 1.3,
        repeticoes: 15,
        series: 5,
        descansoSeg: 30,
      },
      {
        idTreino,
        idExercicio: exercicio4[0].id,
        ordem: 2,
        carga: 25,
        isometriaSeg: 5,
        series: 15,
        descansoSeg: 30,
      },
      {
        idTreino,
        idExercicio: exercicio5[0].id,
        ordem: 3,
        carga: 25,
        repeticoes: 3,
        series: 15,
      },
    ],
  })

  return { exercicioTreino, fotos }
}

export async function seedDB() {
  const passwordHash = await hash('teste123', 1)

  const user = await prisma.user.create({
    data: {
      name: 'Gabriel Magdaleno',
      email: 'gabriel.magadaleno@gmail.com',
      avatarUrl: 'https://github.com/pugialli.png',
      passwordHash,
    },
  })

  const nomeAluno1 = 'Amanda Porto Padilha'
  const slugAluno1 = createSlug(nomeAluno1)
  const aluno1 = await prisma.aluno.create({
    data: {
      nome: nomeAluno1,
      objetivo: 'ficar monstrão',
      slug: slugAluno1,
      idProfessor: user.id,
    },
  })

  const nomeAluno2 = 'João Paulo Pugialli da Silva Souza'
  const slugAluno2 = createSlug(nomeAluno2)
  const aluno2 = await prisma.aluno.create({
    data: {
      nome: nomeAluno2,
      objetivo: 'não ficar zoado',
      slug: slugAluno2,
      idProfessor: user.id,
    },
  })

  const exercicios = await prisma.exercicio.createMany({
    data: [
      {
        nome: 'Abdominal bicicleta',
        categoria: 'costas',
        orientacao:
          '1.Posicione-se no tapete de exercícios, deitado de costas com as mãos atrás da cabeça e os joelhos dobrados em direção ao peito. 2.Eleve as pernas, mantendo os joelhos em um ângulo de 90 graus. 3.Mantenha os cotovelos abertos para os lados e os ombros afastados das orelhas. 4.Faça o movimento idêntico ao de pedalar, levando o cotovelo oposto em direção ao joelho.',
        idProfessor: user.id,
      },
      {
        nome: 'Abdominal canivete',
        categoria: 'costas',
        orientacao:
          '1.Deite-se de costas em um tapete de exercícios, estenda os braços e pernas. 2.Levante o tronco e as pernas ao mesmo tempo, levando os joelhos em direção ao peito. 3.Mantenha o abdômen contraído durante todo o movimento.',
        idProfessor: user.id,
      },
      {
        nome: 'Abdominal com rotação',
        categoria: 'costas',
        orientacao:
          '1.Dobre ligeiramente os joelhos. 2.Posicione-se lateralmente ao aparelho. 3.Puxe o cabo em direção a lateral oposta. 4.Repita para o outro lado, invertendo a posição do corpo.',
        idProfessor: user.id,
      },
      {
        nome: 'Abdominal cruzado',
        categoria: 'costas',
        orientacao:
          '1.Deite-se de costas em um tapete de exercícios com as pernas esticadas. 2.Coloque as mãos atrás da cabeça. 3.Levante o tronco do chão e leve o cotovelo direito em direção ao joelho esquerdo. 4.Retorne à posição inicial e repita do outro lado.',
        idProfessor: user.id,
      },
      {
        nome: 'Abdominal infra',
        categoria: 'costas',
        orientacao:
          '1.Deite-se de costas em um tapete de exercícios, você pode colocar suas mãos embaixo do quadril ou paralelas ao corpo. 2.Levante as pernas em direção em direção ao teto. 3.Mantenha os músculos abdominais contraídos e desça lentamente de volta à posição inicial.',
        idProfessor: user.id,
      },
      {
        nome: 'Abdominal oblíquo',
        categoria: 'costas',
        orientacao:
          '1.Deite-se de costas em um tapete de exercícios, com os braços e pernas estendidas. 2.Levante a perna direita em direção à mão esquerda. 3.Retorne à posição inicial e repita do outro lado.',
        idProfessor: user.id,
      },
      {
        nome: 'Abdominal supra',
        categoria: 'costas',
        orientacao:
          '1.Deite-se de costas em um tapete de exercícios, com os pés juntos perto do corpo e braços estendidos. 2.Levante o tronco do chão, contraindo os músculos abdominais, e depois abaixe-o de volta à posição inicial. 3.Repita o movimento.',
        idProfessor: user.id,
      },
      {
        nome: 'Abdominal supra perna extendida',
        categoria: 'costas',
        orientacao:
          '1.Deite-se de costas em um tapete de exercícios, com pernas e braços estendidos. 2.Levante o tronco do chão, contraindo os músculos abdominais, e depois abaixe-o de volta à posição inicial. 3.Repita o movimento.',
        idProfessor: user.id,
      },
      {
        nome: 'Abdução de ombro',
        categoria: 'costas',
        orientacao:
          '1.Em pé, segure um haltere em cada mão ao lado do corpo. 2.Levante os braços para os lados até a altura dos ombros, mantendo os cotovelos ligeiramente dobrados. 3.Abra os braços ainda mais, afastando-os um do outro, e depois retorne à posição inicial.',
        idProfessor: user.id,
      },
      {
        nome: 'Agachamento bila cross',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros. 2.Segure a barra na altura do quadril. 3.Agache-se, mantendo as costas retas e os joelhos alinhados com os tornozelos. 4.Pressione os calcanhares para voltar à posição inicial.',
        idProfessor: user.id,
      },
      {
        nome: 'Agachamento bilateral',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros. 2.Segure um haltere em cada mão ao lado do corpo. 3.Agache-se, mantendo as costas retas e os joelhos alinhados com os tornozelos. 4.Pressione os calcanhares para voltar à posição inicial.',
        idProfessor: user.id,
      },
      {
        nome: 'Agachamento com dois steps',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros, um pé em cima dos dois steps. 2.Segure um haltere em cada mão ao lado do corpo. 3.Agache-se, mantendo as costas retas. 4.O joelho de trás deve afundar em direção ao chão, evitando que o joelho da frente ultrapasse a linha do pé. 5.Pressione os calcanhares para voltar à posição inicial.',
        idProfessor: user.id,
      },
      {
        nome: 'Agachamento uni cross',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros. 2.Segure a barra na altura do quadril. 3.Agache-se, levando uma perna para trás. 4.Leve o joelho em direção ao chão. 5.Mantenha as costas retas e o joelho da frente alinhado com o pé. 6.Pressione os calcanhares para voltar à posição inicial. 7.Repita do outro lado.',
        idProfessor: user.id,
      },
      {
        nome: 'Agachamento unilateral',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros. 2.Segure um haltere em cada mão ao lado do corpo. 3.Agache-se, levando uma perna para trás. 4.Leve o joelho em direção ao chão. 5.Mantenha as costas retas e o joelho da frente alinhado com o pé. 6.Pressione os calcanhares para voltar à posição inicial. 7.Repita do outro lado.',
        idProfessor: user.id,
      },
      {
        nome: 'Agachamento unilateral step',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com a perna da frente em cima de um step. 2.Agache-se, levando o joelho em direção ao chão. 3.Mantenha as costas retas e o joelho da frente alinhado com o pé. 4.Pressione os calcanhares para voltar à posição inicial. 5.Repita do outro lado.',
        idProfessor: user.id,
      },
      {
        nome: 'Bíceps neutro',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros, segurando um haltere em cada mão ao lado do corpo com o polegar apontado na linha da sua visão. 2.Flexione os cotovelos, levantando os halteres em direção aos ombros, e depois abaixe-os de volta à posição inicial.',
        idProfessor: user.id,
      },
      {
        nome: 'Bíceps supinado',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros, segurando um haltere em cada mão ao lado do corpo com as palmas voltadas para cima. 2.Flexione os cotovelos, levantando os halteres em direção aos ombros, e depois abaixe-os de volta à posição inicial.',
        idProfessor: user.id,
      },
      {
        nome: 'Cadeira do desespero',
        categoria: 'costas',
        orientacao:
          '1.Escore-se em uma parede com toda a coluna encostada na superfície, sem nenhuma folga. 2.Deça até 90 graus e sustente a posição, tentando empurrar a parede para trás.',
        idProfessor: user.id,
      },
      {
        nome: 'Conjugado AOP',
        categoria: 'costas',
        orientacao:
          '1.Segure a barra na altura do quadril. 2.Faça um agachamento. 3.Ao final do movimento, puxe a barra em direção do peito. 4.Sustente o movimento e eleve os calcanhares. 5.Volte para a posição inicial.',
        idProfessor: user.id,
      },
      {
        nome: 'Crucifixo',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé, com o tronco dobrado e abdômen encolhido. 2.Mantenha o tronco reto e ois joelhos semiflexicionados. 3.Com os dois halteres paralelos na altura do ombro, realize o movimento de abertura dos braços.',
        idProfessor: user.id,
      },
      {
        nome: 'Desenvolvimento de ombro',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé, com um haltere em cada mão acima dos ombros, com os braços flexionados. 2.Estenda os braços para cima, pressionando os halteres acima da cabeça, e depois abaixe-os de volta à posição inicial.',
        idProfessor: user.id,
      },
      {
        nome: 'Flexão de ombro',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros e segure um haltere em cada mão ao lado do corpo, com as palmas voltadas para dentro. 2.Levante os halteres para a frente até a altura dos ombros, mantendo os cotovelos ligeiramente flexionados, e depois abaixe-os de volta à posição inicial.',
        idProfessor: user.id,
      },
      {
        nome: 'Flexão de ombro prone',
        categoria: 'costas',
        orientacao:
          '1.Fique de costas para o aparelho, colocando a barra entre suas pernas. 2.Com as mãos voltadas para o chão, extenda os braços até a altura dos ombros com o abdômen ativado.',
        idProfessor: user.id,
      },
      {
        nome: 'Flexão de ombro sup',
        categoria: 'costas',
        orientacao:
          '1.Fique de costas para o aparelho, colocando a barra entre suas pernas. 2.Com as mãos voltadas para cima, extenda os braços até a altura dos ombros com o abdômen ativado.',
        idProfessor: user.id,
      },
      {
        nome: 'Perdigueiro',
        categoria: 'costas',
        orientacao:
          '1.Comece em uma posição de prancha com os braços estendidos e os pulsos diretamente sob os ombros. 2.Levante o braço direito e a perna esquerda ao mesmo tempo, mantendo o tronco estável e abdômen contraído. 3.Retorne à posição inicial e repita do outro lado.',
        idProfessor: user.id,
      },
      {
        nome: 'Prancha',
        categoria: 'costas',
        orientacao:
          '1.Deite-se de bruços no chão e apoie-se nos antebraços e nos dedos dos pés. 2.Mantenha o corpo reto e o quadril ligeiramente apontado para cima. 3.Contraia os músculos abdominais e glúteos, e mantenha a posição por um determinado período de tempo.',
        idProfessor: user.id,
      },
      {
        nome: 'Prancha com braço esticado',
        categoria: 'costas',
        orientacao:
          '1.Deite-se de bruços no chão e apoie-se nas mãos e nos dedos dos pés. 2.Mantenha o corpo reto e o quadril ligeiramente apontado para cima. 3.Contraia os músculos abdominais e glúteos, e mantenha a posição por um determinado período de tempo.',
        idProfessor: user.id,
      },
      {
        nome: 'Prancha com movimento no bolão',
        categoria: 'costas',
        orientacao:
          '1.Apoie os antebraços na bola e estenda as pernas, apoiando-se também nos dedos dos pés. 2.Mantenha o corpo reto e o quadril ligeiramente apontado para cima. 3.Contraia os músculos abdominais e glúteos, e mantenha a posição por um determinado período de tempo.',
        idProfessor: user.id,
      },
      {
        nome: 'Prancha com remada',
        categoria: 'costas',
        orientacao:
          '1.Execute uma prancha padrão com um par de halteres ao lado do corpo. 2.Levante um haltere em direção ao teto, mantendo o corpo estável na posição de prancha. 3.Abaixe o haltere de volta ao chão e repita com o outro braço.',
        idProfessor: user.id,
      },
      {
        nome: 'Prancha cruzada',
        categoria: 'costas',
        orientacao:
          '1.Deite-se de bruços no chão e apoie-se nas mãos e nos dedos dos pés. 2.Mantenha o corpo reto e o quadril ligeiramente apontado para cima. 3.Contraia os músculos abdominais e glúteos. 4.Tire uma das mãos do chão e encoste no ombro oposto. 5.Repita o movimento com o outro lado.',
        idProfessor: user.id,
      },
      {
        nome: 'Prancha dobrando o joelho',
        categoria: 'costas',
        orientacao:
          '1.Deite-se de bruços no chão e apoie-se nas mãos e nos dedos dos pés. 2.Mantenha o corpo reto e o quadril ligeiramente apontado para cima. 3.Contraia os músculos abdominais e glúteos. 4.Puxe um joelho em direção ao abdômen. 5.Repita o movimento com o outro lado.',
        idProfessor: user.id,
      },
      {
        nome: 'Prancha lateral',
        categoria: 'costas',
        orientacao:
          '1.Deite-se de lado no chão e apoie-se no antebraço e no lado do pé. 2.Mantenha o corpo reto, contraia os músculos abdominais e glúteos, e mantenha a posição por um determinado período de tempo. 3.Repita do outro lado.',
        idProfessor: user.id,
      },
      {
        nome: 'Remada aberta',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros, com o tronco ligeiramente inclinado e joelhos semiflexionados. 2.Mantenha dos braços na linha do ombro e segure um haltere em cada mão ao lado do corpo, com as palmas voltadas para trás. 3.Flexione os cotovelos, levantando os halteres até os ombros, mantendo os cotovelos apontados para os lados, e depois abaixe-os de volta à posição inicial.',
        idProfessor: user.id,
      },
      {
        nome: 'Remada alta',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros e segure um haltere em cada mão na frente das coxas, com as palmas voltadas para o corpo. 2.Levante os halteres em direção aos ombros, mantendo os cotovelos apontados para os lados, e depois abaixe-os de volta à posição inicial.',
        idProfessor: user.id,
      },
      {
        nome: 'Remada prone',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros e segure a barra na frente das coxas, com as palmas voltadas para o corpo. 2.Levante a barra em direção aos ombros, mantendo os cotovelos apontados para os lados, e depois abaixe-os de volta à posição inicial.',
        idProfessor: user.id,
      },
      {
        nome: 'Remada dorsal baixa cross',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros e segure a barra na frente das coxas, com as palmas voltadas para cima. 2.Puxe a barra em direção ao abdômen, mantendo os cotovelos paralelos ao tronco.',
        idProfessor: user.id,
      },
      {
        nome: 'Remada baixa prone',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros e segure a barra na frente das coxas, com as palmas voltadas para o chão. 2.Puxe a barra em direção ao abdômen, mantendo os cotovelos paralelos ao tronco.',
        idProfessor: user.id,
      },
      {
        nome: 'Remada com triângulo',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros e segure a o triângulo na frente das coxas. 2.Puxe o triângulo em direção ao abdômen, mantendo os cotovelos paralelos ao tronco.',
        idProfessor: user.id,
      },
      {
        nome: 'Remada fechada',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros e segure um haltere em cada mão ao lado do corpo, com as palmas voltadas para o corpo. 2.Flexione os cotovelos, levantando os halteres em direção aos ombros, mantendo os cotovelos próximos ao corpo, e depois abaixe-os de volta à posição inicial.',
        idProfessor: user.id,
      },
      {
        nome: 'Remada prone barra',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros e segure a barra na altura do abdômen, com as palmas voltadas para o chão. 2.Puxe a barra em direção ao abdômen, mantendo os cotovelos paralelos ao tronco.',
        idProfessor: user.id,
      },
      {
        nome: 'Remada sup barra',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros e segure a barra na altura do abdômen, com as palmas voltadas para o cima. 2.Puxe a barra em direção ao abdômen, mantendo os cotovelos paralelos ao tronco.',
        idProfessor: user.id,
      },
      {
        nome: 'Remada unilateral',
        categoria: 'costas',
        orientacao:
          '1.Apoie-se em uma superfície de modo que seu tronco fique levemente inclinado. 2.Mantenha a coluna reta e o abdômen encolhido. 3.Dê um passo para trás com uma perna. 4.Com braço oposto, segure o halter e puxe na direção do peito. 5.Repita o movimento com o outro braço.',
        idProfessor: user.id,
      },
      {
        nome: 'Step com joelhada',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros, um pé em cima de um step. 2.Dê um passo para cima com a outra perna e levante o joelho em direção ao peito. 3.Desça e repita do outro lado.',
        idProfessor: user.id,
      },
      {
        nome: 'Stiff bilateral',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros e segure um haltere em cada mão à frente do corpo. 2.Mantenha os joelhos semiflexionados. 3.Incline o tronco para a frente, mantendo as costas retas, até os pesos chegarem um pouco abaixo dos joelhos. 4.Volte à posição inicial.',
        idProfessor: user.id,
      },
      {
        nome: 'Stiff unilateral',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros e segure um haltere em uma mão ao lado do corpo. 2.Incline o tronco para a frente, junto com o peso, mantendo as costas retas, e elevando a perna oposta. 3.O peso deve chegar até um pouco abaixo do joelho. 4.Volte à posição inicial e repita do outro lado.',
        idProfessor: user.id,
      },
      {
        nome: 'Sumô',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados além da largura dos ombros e os dedos dos pés ligeiramente virados para fora. 2.Segure um haltere com ambas as mãos na frente do corpo, entre as pernas. 3.Agache-se, mantendo as costas retas e os joelhos alinhados com os tornozelos, e depois pressione os calcanhares para voltar à posição inicial.',
        idProfessor: user.id,
      },
      {
        nome: 'Sumô no step',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados além da largura dos ombros, cada pé em cima de um step. 2.Segure um haltere com ambas as mãos na frente do corpo, entre as pernas. 3.Agache-se, mantendo as costas retas e os joelhos alinhados com os tornozelos, e depois pressione os calcanhares para voltar à posição inicial.',
        idProfessor: user.id,
      },
      {
        nome: 'Tríceps corda bilateral',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros e segure a corda com ambas as mãos. 2.Os cotovelos devem ficar colados ao corpo. 3.Flexione os cotovelos, puxando a corda. 4.Lembre-se de não inclinar exageradamente o tronco.',
        idProfessor: user.id,
      },
      {
        nome: 'Tríceps coice',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros, segurando os halteres ao lado do corpo e inclinando o tronco para a frente. 2.Mantenha o abdômen contraído. 3.Flexione o cotovelo, levando os halteres para trás em um movimento de extensão.',
        idProfessor: user.id,
      },
      {
        nome: 'Tríceps francês',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros e segure a corda atrás da cabeça com as duas mãos. 2.Com os cotovelos fixos ao lado da cabeça, extenda os cotovelos, levando a corda até acima da cabeça.',
        idProfessor: user.id,
      },
      {
        nome: 'Tríceps corda unilateral',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros e segure a corda com uma mão. 2.Apoie a mão oposta no cotovelo. 3.Flexione o cotovelo, puxando a corda. 4.Lembre-se de não inclinar exageradamente o tronco.',
        idProfessor: user.id,
      },
      {
        nome: 'Tríceps prone barra',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros e segure a barra com ambas as mãos. 2.As mãos devem estar voltadas para baixo. 3.Os cotovelos devem ficar colados ao corpo. 4.Flexione os cotovelos, puxando a barra. 5.Lembre-se de não inclinar exageradamente o tronco.',
        idProfessor: user.id,
      },
      {
        nome: 'Tríceps sup barra',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros e segure a barra com ambas as mãos. 2.As mãos devem estar voltadas para cima. 3.Os cotovelos devem ficar colados ao corpo. 4.Flexione os cotovelos, puxando a barra. 5.Lembre-se de não inclinar exageradamente o tronco.',
        idProfessor: user.id,
      },
      {
        nome: 'Tríceps testa',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros e segure a barra com ambas as mãos atrás da cabeça. 2.Os cotovelos devem ficar alinhados e a 90 graus dos ombros. 3.Incline levemente o tronco. 4.Flexione os cotovelos até esticar os braços. ',
        idProfessor: user.id,
      },
      {
        nome: 'Tríceps corda unilateral',
        categoria: 'costas',
        orientacao:
          '1.Fique em pé com os pés afastados na largura dos ombros e segure a corda com uma mão na altura do peito. 2.Mantenha o cotovelo colado ao corpo. 3.Extenda o cotovelo, puxando a corda em direção ao chão.',
        idProfessor: user.id,
      },
    ],
  })

  const treino = await prisma.treino.create({
    data: {
      idAluno: aluno1.id,
    },
  })

  const exercicioTreino = await createTreino(treino.id)

  return { user, aluno1, aluno2, exercicios, treino, exercicioTreino }
}
