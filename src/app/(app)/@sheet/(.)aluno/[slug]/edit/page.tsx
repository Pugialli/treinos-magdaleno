import { redirect } from 'next/navigation'

import { AlunoForm } from '@/app/(app)/create-aluno/aluno-form'
import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { getAluno } from '@/http/get-aluno'

export default async function EditAluno({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const aluno = await getAluno((await params).slug)

  if (!aluno) redirect('/')

  return (
    // <>
    //   <Header />
    //   <div className="space-y-4 p-4">
    //     <h1 className="pb-2 text-2xl font-bold">Editar aluno</h1>

    //     <Button size="sm" variant="outline" asChild>
    //       <Link href="/">
    //         <CircleChevronLeft className="mr-2 size-4" />
    //         Voltar
    //       </Link>
    //     </Button>

    //     <AlunoForm isUpdating initialData={aluno} />
    //   </div>
    // </>

    <Sheet defaultOpen>
      <InterceptedSheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Editar aluno</SheetTitle>
        </SheetHeader>

        <div className="p-4">
          <AlunoForm isUpdating initialData={aluno} />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}