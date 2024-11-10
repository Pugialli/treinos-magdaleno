import { redirect } from 'next/navigation'

import { loggedUser } from '@/auth/auth'
import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { TreinoForm } from '../../create-treino/treino-form'

export default async function CreateTreino() {
  const user = await loggedUser()

  if (!user) redirect('/')

  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Criar treino</SheetTitle>
        </SheetHeader>

        <div className="p-4">
          <TreinoForm idProfessor={user.id} />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
