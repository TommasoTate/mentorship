'use server';

import { db } from "@/db";
import { startups, users } from "@/db/schema";
import { requireRole } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

interface CreateStartupInput {
  name: string;
  industry: string;
  description?: string;
  logoUrl?: string;
}

export async function createStartup(input: CreateStartupInput) {
  const user = await requireRole(["founder"]);

  // Check if user already has a startup
  const existingStartup = await db.query.startups.findFirst({
    where: eq(startups.founderId, user.id),
  });

  if (existingStartup) {
    throw new Error("You already have a startup");
  }

  await db.insert(startups).values({
    name: input.name,
    industry: input.industry,
    description: input.description,
    logoUrl: input.logoUrl,
    founderId: user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  revalidatePath("/dashboard/startup");
  redirect("/dashboard/startup");
}

interface UpdateStartupInput extends CreateStartupInput {
  startupId: string;
}

export async function updateStartup(input: UpdateStartupInput) {
  const user = await requireRole(["founder"]);

  const startup = await db.query.startups.findFirst({
    where: eq(startups.id, input.startupId),
  });

  if (!startup) {
    throw new Error("Startup not found");
  }

  if (startup.founderId !== user.id) {
    throw new Error("Unauthorized");
  }

  await db
    .update(startups)
    .set({
      name: input.name,
      industry: input.industry,
      description: input.description,
      logoUrl: input.logoUrl,
      updatedAt: new Date(),
    })
    .where(eq(startups.id, input.startupId));

  revalidatePath("/dashboard/startup");
}

interface InviteTeamMemberInput {
  email: string;
  startupId: string;
}

export async function inviteTeamMember(input: InviteTeamMemberInput) {
  const user = await requireRole(["founder"]);

  const startup = await db.query.startups.findFirst({
    where: eq(startups.id, input.startupId),
  });

  if (!startup) {
    throw new Error("Startup not found");
  }

  if (startup.founderId !== user.id) {
    throw new Error("Unauthorized");
  }

  // Check if user already exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, input.email),
  });

  if (existingUser) {
    // Update their role to employee if they're not already
    if (existingUser.role !== "employee") {
      await db
        .update(users)
        .set({
          role: "employee",
          updatedAt: new Date(),
        })
        .where(eq(users.id, existingUser.id));
    }
  }

  // Note: In a real app, you would send an email invitation here
  // and handle the signup flow with Clerk

  revalidatePath("/dashboard/team");
} 