import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export default clerkMiddleware((auth, request) => {
  if (request.url.includes('/sign-in')) {
    return NextResponse.next()
  }
  const { userId } = auth()
  if (!userId) {
    return NextResponse.redirect('http://localhost:3000/sign-in')
  }
  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
