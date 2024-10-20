import { auth, clerkClient } from '@clerk/nextjs/server'
import { createSafeActionClient } from 'next-safe-action'

async function updateUserMetadata(userId: string, sessionClaims: any) {
  return await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      ...sessionClaims?.metadata,
      onboardingComplete: true,
    },
  })
}

export const actionClient = createSafeActionClient()

export const authorizedClient = actionClient.use(async ({ next }) => {
  const { userId, sessionClaims } = auth()
  if (!userId) throw new Error('No Logged In User')
  await updateUserMetadata(userId, sessionClaims)
  return next({ ctx: { userId } })
})
