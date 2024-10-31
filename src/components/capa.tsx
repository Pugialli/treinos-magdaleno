import { Roboto } from 'next/font/google'
import Image from 'next/image'

import background from '@/assets/background.png'
import logo from '@/assets/logo.svg'
import { Separator } from '@/components/ui/separator'
import { getAluno } from '@/http/get-aluno'
import { getTreino } from '@/http/get-treino'

import { SectionWithBackground } from './SectionWithBackground'
import { dateToString } from './utils/string-to-date'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

// export interface CapaPageProps {
//   params: {
//     id: string
//   }
// }

export async function Capa() {
  // const alunoId = params.id
  const alunoId = '3c035344-961f-4415-abc4-0d48729c663c'
  const treinoId = '8e8e167b-46ea-4da2-b78e-b8e311f775ec'

  const aluno = await getAluno(alunoId)
  const treino = await getTreino(treinoId)

  return (
    <div>
      <SectionWithBackground imageSrc={background}>
        <div className="absolute flex flex-col items-center gap-5 px-28 py-48">
          <Image src={logo} width={90} height={90} alt="" />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary">
              Gabriel Magdaleno
            </h1>
            <h2
              className={`${roboto.className} text-2xl text-muted-foreground`}
            >
              Fisioterapeuta & Educador Físico
            </h2>
          </div>
        </div>
      </SectionWithBackground>
      <div className="flex flex-col gap-11 px-9 py-11 text-center">
        <span className="text-2xl font-light text-primary">
          TREINO INDIVIDUALIZADO
        </span>
        <Separator className="bg-primary" />
        <div className="flex flex-col gap-2">
          <span className="text-sm font-light">Nome do Aluno(a):</span>
          <span className="font-semibold">{aluno.nome}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-light">Objetivo</span>
          <span>{aluno.objetivo}</span>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-light">
              Início do acompanhamento:
            </span>
            <span>{dateToString(new Date(aluno.createdAt))}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-light">Data da série atual:</span>
            <span>{dateToString(new Date(treino.createdAt))}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
