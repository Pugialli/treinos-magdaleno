import type { InputHTMLAttributes } from 'react'

import { Input } from './ui/input'

export interface InputWithLabelProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function InputWithLabel({ label, ...props }: InputWithLabelProps) {
  return (
    <div className="grid grid-cols-12">
      <Input {...props} className="col-span-7 rounded-none rounded-l-md" />
      <Input
        className="col-span-5 rounded-none rounded-r-md px-1"
        disabled
        value={label}
      />
    </div>
  )
}
