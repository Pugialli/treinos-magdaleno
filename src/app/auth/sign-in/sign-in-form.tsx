'use client'

import { AlertTriangle, Loader2, Lock, Mail } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import { FormInput } from '@/components/form-input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useFormState } from '@/hooks/use-form-state'

import { signInWithEmailAndPassword } from './actions'

export function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signInWithEmailAndPassword,
    () => router.push('/'),
  )

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        <h1 className="text-center text-4xl font-bold text-primary">Log In</h1>

        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <FormInput
          label="E-mail"
          errors={errors}
          icon={Mail}
          name="email"
          id="email"
          type="email"
          defaultValue={searchParams.get('email') ?? ''}
        />

        <FormInput
          label="Senha"
          errors={errors}
          icon={Lock}
          name="password"
          id="password"
          hidable
        />

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Entrar'}
        </Button>
      </div>
    </form>
  )
}
