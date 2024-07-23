import { db } from '@/db'
import { startups } from '@/db/schema'
import OnboardingForm from '@/app/onboarding/components/form'
import { eq } from 'drizzle-orm'

export default async function Onboarding() {
  const startupsPromise = db
    .select()
    .from(startups)
    .where(eq(startups.status, 'approved'))
  return <OnboardingForm startupsPromise={startupsPromise} />
}
