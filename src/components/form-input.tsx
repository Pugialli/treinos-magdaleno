import { Input, type InputProps } from './ui/input'
import { Label } from './ui/label'

export interface FormInputProps extends InputProps {
  label: string
  errors?: Record<string, string[]> | null
}

export function FormInput({ label, errors, ...props }: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="email" className="font-normal text-foreground">
        {label}
      </Label>
      <Input {...props} />

      {errors?.password && (
        <p className="text-xs font-medium text-red-500 dark:text-red-400">
          {errors.password[0]}
        </p>
      )}
    </div>
  )
}
