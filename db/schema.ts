import { pgTable, text, timestamp, uuid, boolean, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table - extends Clerk user data
export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  clerkId: text().notNull().unique(),
  role: text('role', { enum: ['mentor', 'founder', 'employee'] }).notNull(),
  name: text().notNull(),
  email: text().notNull().unique(),
  avatarUrl: text(),
  bio: text(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Startups table
export const startups = pgTable('startups', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  logoUrl: text(),
  industry: text().notNull(),
  description: text(),
  founderId: uuid().notNull().references(() => users.id),
  metrics: jsonb(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Mentorship sessions table
export const sessions = pgTable('sessions', {
  id: uuid().primaryKey().defaultRandom(),
  mentorId: uuid().notNull().references(() => users.id),
  requesterId: uuid().notNull().references(() => users.id),
  startupId: uuid().notNull().references(() => startups.id),
  status: text({ enum: ['pending', 'accepted', 'rejected', 'completed'] }).notNull(),
  scheduledAt: timestamp().notNull(),
  agenda: text().notNull(),
  notes: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

// Notifications table
export const notifications = pgTable('notifications', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().notNull().references(() => users.id),
  type: text({ 
    enum: ['session_requested', 'session_accepted', 'session_rejected', 'session_reminder'] 
  }).notNull(),
  title: text().notNull(),
  message: text().notNull(),
  read: boolean().default(false).notNull(),
  metadata: jsonb(),
  createdAt: timestamp().defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  notifications: many(notifications),
}));

export const startupsRelations = relations(startups, ({ one, many }) => ({
  founder: one(users, {
    fields: [startups.founderId],
    references: [users.id],
  }),
  sessions: many(sessions),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  mentor: one(users, {
    fields: [sessions.mentorId],
    references: [users.id],
  }),
  requester: one(users, {
    fields: [sessions.requesterId],
    references: [users.id],
  }),
  startup: one(startups, {
    fields: [sessions.startupId],
    references: [startups.id],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
})); 