import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground text-xl font-bold hover:bg-primary/80 font-bold [&_svg]:pointer-events-none',
        secondary:
          'bg-transparent border-primary text-xl font-bold border-2 text-primary-foreground hover:bg-primary/80 font-bold',
        tertiary:
          'bg-card text-xl font-bold text-primary hover:bg-card/80 font-bold',
        destructive:
          'bg-destructive text-xl font-bold text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input text-xl font-bold bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        menu: 'hover:bg-card',
        link: 'text-foreground underline-offset-4 hover:text-foreground/50',
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-9 rounded-md px-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-14 rounded-md px-8 w-full',
        icon: 'h-10 w-10',
        menu: 'size-14 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
