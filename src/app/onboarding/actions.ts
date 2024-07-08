'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { OnboardingForm } from '@/app/onboarding/page'

export const completeOnboarding = async (formData: OnboardingForm) => {
  const { userId, sessionClaims } = auth()

  if (!userId) {
    return { message: 'No Logged In User' }
  }

  try {
    const res = await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        ...sessionClaims?.metadata,
        onboardingComplete: true,
      },
    })
    // TODO: Update user on DB using drizzle orm
    console.log('Updating user with data:', formData)

    return { message: res.publicMetadata }
  } catch (err) {
    return { error: 'There was an error updating the user metadata.' }
  }
}
