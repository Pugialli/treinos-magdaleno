import Image from 'next/image'

import profile from '@/assets/profile.png'

import { Separator } from './ui/separator'

export function Sobre() {
  return (
    <div className="flex flex-col items-center gap-11 px-9 py-36 text-center">
      <h1 className="text-2xl font-light text-primary">SOBRE MIM</h1>
      <Separator className="bg-primary" />
      <Image src={profile} width={223} height={223} alt="" />
      <p className="text-balance">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
        viverra fermentum tempus. Donec a augue in eros consequat ullamcorper
        vel ac velit. Integer et erat magna. Sed fringilla lobortis laoreet.
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. Etiam imperdiet pellentesque nibh vitae
        interdum. Morbi non suscipit eros, et consequat nunc. Sed eget eleifend
        neque. Suspendisse dolor orci, bibendum vel auctor id, ultrices ac diam.
        Nam ut imperdiet mi, eget faucibus sapien. Pellentesque faucibus nulla
        in lorem imperdiet accumsan.
      </p>
    </div>
  )
}
