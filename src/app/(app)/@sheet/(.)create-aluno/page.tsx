import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { AlunoForm } from '../../create-aluno/aluno-form'

export default function CreateAluno() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Criar aluno</SheetTitle>
        </SheetHeader>

        <div className="p-4">
          <AlunoForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
