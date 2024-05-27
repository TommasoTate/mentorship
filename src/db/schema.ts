import {text, pgTable, pgEnum, serial, integer} from "drizzle-orm/pg-core";

export const startupStatusEnum = pgEnum("startupStatus", [
  "pending",
  "approved",
  "rejected",
]);

export const consultationStatusEnum = pgEnum("consultationStatus", [
  "pending",
  "accepted",
  "rejected",
]);

export const startups = pgTable("startups", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  status: startupStatusEnum("status").notNull().default("pending"),
});

export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  mentorId: text("mentorId").notNull(),
  startupperId: text("startupperId").notNull(),
  startDate: text("startDate").notNull(),
  endDate: text("endDate").notNull(),
  status: consultationStatusEnum("status").notNull().default("pending"),
});

export const startupMembers = pgTable("startup_members", {
  startupperId: text("startupperId").notNull(),
  startupId: integer("consultationId").notNull().references(() => startups.id)
});

export type Startup = typeof startups.$inferSelect;
export type Consultation = typeof consultations.$inferSelect;
export type NewStartup = typeof startups.$inferInsert;
export type NewConsultation = typeof consultations.$inferInsert;
export type StartupMember = typeof startupMembers.$inferSelect;
export type NewStartupMember = typeof startupMembers.$inferInsert;
