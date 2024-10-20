import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export default async function Home() {
  const { userId } = auth()
  const user = (
    await db.select().from(users).where(eq(users.clerkId, userId!)).limit(1)
  )[0]

  if (user?.role === 'admin') redirect('/admin/users')
  if (user?.role === 'startupper') redirect('/startupper/consultations')
  if (user?.role === 'mentor') redirect('/mentor/consultations')
}
