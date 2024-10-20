'use server'

import { db } from '@/db'
import { startupMembers, startups, users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { authorizedClient } from '@/lib/safe-action'
import { founderSchema, mentorSchema, startupperSchema } from './formSchemas'

async function updateUserInDb(userId: string, name: string, role: Role) {
  return await db
    .update(users)
    .set({ name, role })
    .where(eq(users.clerkId, userId))
    .returning()
}

export const startupAdminOnboardingAction = authorizedClient
  .schema(founderSchema)
  .action(async ({ parsedInput, ctx }) => {
    const user = await updateUserInDb(
      ctx.userId,
      parsedInput.name,
      'startup-admin',
    )
    const startup = await db
      .insert(startups)
      .values({
        name: parsedInput.startupName!,
        description: parsedInput.description,
      })
      .returning()
    await db.insert(startupMembers).values({
      startupperId: user[0].id,
      startupId: startup[0].id,
      admin: true,
    })

    return {
      successful: true,
      message: 'Startup Admin onboarding completed successfully',
    }
  })

export const startupperOnboardingAction = authorizedClient
  .schema(startupperSchema)
  .action(async ({ parsedInput, ctx }) => {
    const user = await updateUserInDb(
      ctx.userId,
      parsedInput.name,
      'startupper',
    )
    await db.insert(startupMembers).values({
      startupperId: user[0].id,
      startupId: parseInt(parsedInput.startupId),
      admin: true,
    })

    return {
      successful: true,
      message: 'Startupper onboarding completed successfully',
    }
  })

export const mentorOnboardingAction = authorizedClient
  .schema(mentorSchema)
  .action(async ({ parsedInput, ctx }) => {
    await updateUserInDb(ctx.userId, parsedInput.name, 'mentor')
    return {
      successful: true,
      message: 'Mentor onboarding completed successfully',
    }
  })
