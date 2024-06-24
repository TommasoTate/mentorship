import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default function Home() {
  const { sessionClaims } = auth()
  const role = sessionClaims?.metadata?.role
  if (role === 'admin') redirect('/admin/users')
  if (role === 'startupper') redirect('/startupper/consultations')
  if (role === 'mentor') redirect('/mentor/consultations')
}
