import {
  text,
  pgTable,
  pgEnum,
  serial,
  integer,
  timestamp,
  boolean,
  primaryKey,
} from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'

export const userStatusEnum = pgEnum('startupStatus', [
  'pending',
  'approved',
  'rejected',
])

export const startupStatusEnum = pgEnum('startupStatus', [
  'pending',
  'approved',
  'rejected',
])

export const consultationStatusEnum = pgEnum('consultationStatus', [
  'pending',
  'accepted',
  'rejected',
])

export const rolesEnum = pgEnum('roles', [
  'admin',
  'startupper',
  'startup-admin',
  'mentor',
])

const timpestampFields = {
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
}

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique('email_unique'),
  name: text('name').notNull(),
  role: rolesEnum('role'),
  status: userStatusEnum('status').notNull().default('pending'),
  calendarLink: text('calendarLink'),
  clerkId: text('clerkId').notNull().unique('clerkId_unique'),
  ...timpestampFields,
})

export const startups = pgTable('startups', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique('name_unique'),
  description: text('description').notNull(),
  status: startupStatusEnum('status').notNull().default('pending'),
  ...timpestampFields,
})

export const consultations = pgTable('consultations', {
  id: serial('id').primaryKey(),
  mentorId: integer('mentorId')
    .notNull()
    .references(() => users.id),
  startupperId: integer('startupperId')
    .notNull()
    .references(() => users.id),
  startDate: text('startDate').notNull(),
  endDate: text('endDate').notNull(),
  status: consultationStatusEnum('status').notNull().default('pending'),
  ...timpestampFields,
})

export const startupMembers = pgTable(
  'startup_members',
  {
    admin: boolean('admin').notNull().default(false),
    startupperId: integer('startupperId')
      .notNull()
      .references(() => users.id),
    startupId: integer('startupId')
      .notNull()
      .references(() => startups.id),
    ...timpestampFields,
  },
  (table) => ({
    pk: primaryKey({ columns: [table.startupperId, table.startupId] }),
  }),
)

export const selectStartupSchema = createSelectSchema(startups)

export type Startup = typeof startups.$inferSelect
export type NewStartup = typeof startups.$inferInsert
export type Consultation = typeof consultations.$inferSelect
export type NewConsultation = typeof consultations.$inferInsert
export type StartupMember = typeof startupMembers.$inferSelect
export type NewStartupMember = typeof startupMembers.$inferInsert
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
