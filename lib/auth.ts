import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export type UserRole = "mentor" | "founder" | "employee";

export async function getCurrentUser() {
  const clerkUser = await currentUser();
  console.log('clerkUser', clerkUser);

  if (!clerkUser) {
    return null;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkUser.id),
  });

  return user;
}

export async function requireAuth() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }
}

export async function requireRole(allowedRoles: UserRole[]) {
  await requireAuth();
  const user = await getCurrentUser();

  if (!user || !allowedRoles.includes(user.role as UserRole)) {
    redirect("/unauthorized");
  }

  return user;
} 