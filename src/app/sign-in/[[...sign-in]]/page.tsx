import { SignInButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Page() {
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
        <SignInButton
          mode={'modal'}
          fallbackRedirectUrl={'localhost:3000/admin/startups'}
          forceRedirectUrl={'localhost:3000/admin/startups'}
        >
          <Button className="w-full">Sign in</Button>
        </SignInButton>
      </div>
    </div>
  )
}
