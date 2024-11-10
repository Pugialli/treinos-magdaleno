import Image from 'next/image'
import Link from 'next/link'

import logo from '@/assets/logo.svg'

import { ProfileButton } from './profile-button'

export async function Header() {
  return (
    <div className="mx-auto flex items-center justify-between p-4">
      <Link href="/" className="flex items-center gap-3">
        <Image src={logo} className="size-8" alt="" />
      </Link>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </div>
  )
}
