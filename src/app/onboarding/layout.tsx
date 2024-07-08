import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!!auth().sessionClaims?.metadata.onboardingComplete) {
    redirect('/')
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}
