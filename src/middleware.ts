import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export default clerkMiddleware((auth, request) => {
  if (request.url.includes('/sign-in')) {
    return NextResponse.next()
  }
  const { userId } = auth()
  if (!userId) {
    const response = NextResponse.redirect(new URL('/sign-in', request.url))
    response.cookies.set('redirect', request.url)
    return response
  }
  let response = NextResponse.next()
  let redir = request.cookies.get('redirect')
  if(redir) {
    response = NextResponse.redirect(redir.value)
  }
  response.cookies.delete('redirect')
  return response
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
