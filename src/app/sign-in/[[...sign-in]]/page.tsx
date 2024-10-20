'use client'

import { SignInButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function Page() {
  const redirectUrl = useRef<string | undefined>(undefined)
  const searchParams = useSearchParams()
  const redirectUrlParam = searchParams.get('redirect_url')
  useEffect(() => {
    if (redirectUrlParam) {
      redirectUrl.current = decodeURIComponent(redirectUrlParam)
      redirectUrl.current = redirectUrl.current.replace(
        window?.location?.origin,
        '',
      )
    }
  }, [redirectUrlParam])

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
        <SignInButton mode={'modal'} forceRedirectUrl={redirectUrl.current}>
          <Button className="w-full">Sign in</Button>
        </SignInButton>
      </div>
    </div>
  )
}
