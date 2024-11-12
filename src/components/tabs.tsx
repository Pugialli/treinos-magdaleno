import { NavLink } from './nav-link'
import { Button } from './ui/button'

export async function Tabs() {
  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
        >
          <NavLink href={'/'}>Alunos</NavLink>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
        >
          <NavLink href={'/treinos'}>Treinos</NavLink>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
        >
          <NavLink href={'/exercicios'}>Exercícios</NavLink>
        </Button>
      </nav>
    </div>
  )
}
