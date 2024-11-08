import Image from 'next/image'

import logo from '@/assets/logo.svg'

import { ProfileButton } from './profile-button'

export async function Header() {
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <Image src={logo} className="size-8" alt="" />
      </div>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </div>
  )
}
