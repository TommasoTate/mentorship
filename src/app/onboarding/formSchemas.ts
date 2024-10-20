import { z } from 'zod'

export const founderSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  startupName: z.string().min(3, 'Startup name must be at least 3 characters'),
  description: z.string(),
})

export type FounderFormSchema = z.infer<typeof founderSchema>

export const mentorSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  description: z.string(),
})

export type MentorFormSchema = z.infer<typeof mentorSchema>

export const startupperSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  startupId: z.string(),
  description: z.string(),
})

export type StartupperFormSchema = z.infer<typeof startupperSchema>
