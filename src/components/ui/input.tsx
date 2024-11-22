import { EyeIcon, EyeOffIcon } from 'lucide-react'
import {
  type ElementType,
  forwardRef,
  type InputHTMLAttributes,
  useState,
} from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ElementType
  prefix?: string
  hidable?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ prefix, icon: Icon, className, type, hidable = false, ...props }, ref) => {
    const [isHidden, setIsHidden] = useState(hidable)

    function toggleHidden() {
      setIsHidden((state) => !state)
    }

    return (
      <div
        aria-invalid={props['aria-invalid']}
        aria-disabled={props.readOnly || props.disabled}
        className={cn(
          'flex h-14 w-full items-center gap-2 rounded-lg border border-input bg-primary-foreground px-3 py-2 placeholder-muted-foreground shadow-sm',
          'aria-invalid:border-red-400',
          'aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
          'focus-within:border-primary/50 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary',
        )}
      >
        {Icon && <Icon className="size-6 text-card-foreground" />}
        {prefix && <span className="text-input">{prefix}</span>}
        <input
          type={isHidden ? 'password' : type}
          className={cn(
            'flex-1 border-0 bg-transparent p-0 px-2 text-xl text-foreground placeholder-muted-foreground outline-none',
            'read-only:cursor-not-allowed',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'autofill:bg-transparent',
            className,
          )}
          ref={ref}
          {...props}
        />
        {hidable && (
          <button type="button" onClick={toggleHidden}>
            {isHidden ? (
              <EyeOffIcon className="text-card-foreground" />
            ) : (
              <EyeIcon className="text-card-foreground" />
            )}
          </button>
        )}
      </div>
      // <input
      //   type={type}
      //   className={cn(
      //     'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      //     className,
      //   )}
      //   ref={ref}
      //   {...props}
      // />
    )
  },
)
Input.displayName = 'Input'

export { Input }
