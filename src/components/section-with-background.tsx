import Image, { type StaticImageData } from 'next/image'
import type { ReactNode } from 'react'

export interface SectionWithBackgroundProps {
  children: ReactNode
  imageSrc: StaticImageData
}

export function SectionWithBackground({
  children,
  imageSrc,
}: SectionWithBackgroundProps) {
  return (
    <div className="relative flex items-center">
      <Image src={imageSrc} className="-z-50 w-full" alt="" />
      <div className="absolute left-0 top-0 h-full w-full">{children}</div>
    </div>
  )
}
