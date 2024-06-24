'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

export const SignIn = () => {
  const path = usePathname()
  console.log(path)
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link
              href="#"
              className="font-medium text-primary hover:underline"
              prefetch={false}
            >
              Register
            </Link>
          </p>
        </div>
        <SignInButton fallbackRedirectUrl={path} mode={'modal'}>
          <Button className="w-full">Sign in</Button>
        </SignInButton>
      </div>
    </div>
  )
}
