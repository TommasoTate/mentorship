import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export default clerkMiddleware((auth, request) => {
  if (request.url.includes('/sign-in')) {
    return NextResponse.next()
  }
  const { userId } = auth()
  if (!userId) {
    const response = NextResponse.redirect('http://localhost:3000/sign-in')
    response.cookies.set('redirect', request.url)
    return response
  }
  const response = NextResponse.next()
  response.cookies.delete('redirect')
  return response
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
