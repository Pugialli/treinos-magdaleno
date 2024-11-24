'use client'

import { NavLink } from './nav-link'
import { Button } from './ui/button'
import { SheetContent, SheetHeader, SheetTitle } from './ui/sheet'

export function SheetSidebar() {
  return (
    <SheetContent side="left" className="rounded-lg">
      <SheetHeader>
        <SheetTitle className="text-center text-2xl font-bold">Menu</SheetTitle>
      </SheetHeader>

      <div className="grid gap-10 py-10">
        <Button
          asChild
          variant="ghost"
          className="h-16 rounded-none text-xl text-foreground data-[current=true]:bg-primary-foreground"
        >
          <NavLink href={'/'}>Alunos</NavLink>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="h-16 rounded-none text-xl text-foreground data-[current=true]:bg-primary-foreground"
        >
          <NavLink href={'/treinos'}>Treinos</NavLink>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="h-16 rounded-none text-xl text-foreground data-[current=true]:bg-primary-foreground"
        >
          <NavLink href={'/exercicios'}>Exercícios</NavLink>
        </Button>
      </div>
      {/* <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Save changes</Button>
        </SheetClose>
      </SheetFooter> */}
    </SheetContent>
  )
}
