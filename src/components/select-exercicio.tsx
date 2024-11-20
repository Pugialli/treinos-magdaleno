'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

import type { GetExercicioResponse } from '@/app/api/exercicios/[id]/get-exercicio'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface SelectExercicioProps {
  exercicios: GetExercicioResponse[]
  initialData?: string
  setIdExercicio: Dispatch<SetStateAction<string>>
}

export function SelectExercicio({
  exercicios,
  initialData,
  setIdExercicio,
  ...props
}: SelectExercicioProps) {
  const initialValue = initialData || ''

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    if (initialData) {
      setValue(initialData)
    }
  }, [initialData])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? exercicios.find((exercicio) => exercicio.nome === value)?.nome
            : 'Selecione um exercício...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Procure um exercício..." {...props} />
          <CommandList>
            <CommandEmpty>Nenhum exercício encontrado.</CommandEmpty>
            <CommandGroup>
              {exercicios.map((exercicio) => (
                <CommandItem
                  key={exercicio.id}
                  value={exercicio.nome}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setIdExercicio(exercicio.id)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === exercicio.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {exercicio.nome}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
