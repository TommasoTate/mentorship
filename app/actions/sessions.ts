'use server';

import { db } from "@/db";
import { sessions, startups } from "@/db/schema";
import { getCurrentUser, requireRole } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

interface CreateSessionInput {
  mentorId: string;
  scheduledAt: Date;
  agenda: string;
}

export async function createSession(input: CreateSessionInput) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  // Get startup ID if the user is a founder or employee
  const startup = await db.query.startups.findFirst({
    where: eq(startups.founderId, user.id),
  });

  if (!startup) {
    throw new Error("No startup found");
  }

  await db.insert(sessions).values({
    mentorId: input.mentorId,
    requesterId: user.id,
    startupId: startup.id,
    scheduledAt: input.scheduledAt,
    agenda: input.agenda,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  revalidatePath("/dashboard/sessions");
  redirect("/dashboard/sessions");
}

interface UpdateSessionStatusInput {
  sessionId: string;
  status: "accepted" | "rejected" | "completed";
}

export async function updateSessionStatus(input: UpdateSessionStatusInput) {
  const user = await requireRole(["mentor"]);

  const session = await db.query.sessions.findFirst({
    where: eq(sessions.id, input.sessionId),
  });

  if (!session) {
    throw new Error("Session not found");
  }

  if (session.mentorId !== user.id) {
    throw new Error("Unauthorized");
  }

  await db
    .update(sessions)
    .set({
      status: input.status,
      updatedAt: new Date(),
    })
    .where(eq(sessions.id, input.sessionId));

  revalidatePath("/dashboard/sessions");
  revalidatePath(`/dashboard/sessions/${input.sessionId}`);
}

export async function addSessionNotes({
  sessionId,
  notes,
}: {
  sessionId: string;
  notes: string;
}) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const session = await db.query.sessions.findFirst({
    where: eq(sessions.id, sessionId),
  });

  if (!session) {
    throw new Error("Session not found");
  }

  // Only allow mentor or the requester to add notes
  if (session.mentorId !== user.id && session.requesterId !== user.id) {
    throw new Error("Unauthorized");
  }

  await db
    .update(sessions)
    .set({
      notes,
      updatedAt: new Date(),
    })
    .where(eq(sessions.id, sessionId));

  revalidatePath(`/dashboard/sessions/${sessionId}`);
} 