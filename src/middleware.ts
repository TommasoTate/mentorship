import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export default clerkMiddleware((auth, request) => {
  const { userId, redirectToSignIn } = auth()
  if (!userId) {
    return redirectToSignIn({ returnBackUrl: request.url })
  }
  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
