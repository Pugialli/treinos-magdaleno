import { Menu } from 'lucide-react'

import { ProfileButton } from './profile-button'
import { Button } from './ui/button'
import { SheetTrigger } from './ui/sheet'

export async function Header() {
  return (
    <div className="mx-auto flex items-center justify-between px-8 pt-8">
      <SheetTrigger asChild>
        <Button variant="menu" size="menu">
          <Menu className="size-14 text-primary" />
        </Button>
      </SheetTrigger>
      {/* <Link href="/" className="flex items-center gap-3">
      <Menu className="size-14 text-primary" />
    </Link> */}

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </div>
  )
}
