'use server';

import { db } from "@/db";
import { notifications } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

interface CreateNotificationInput {
  userId: string;
  type: 'session_requested' | 'session_accepted' | 'session_rejected' | 'session_reminder';
  title: string;
  message: string;
  metadata?: Record<string, string | number | boolean | null>;
}

export async function createNotification(input: CreateNotificationInput) {
  await db.insert(notifications).values({
    userId: input.userId,
    type: input.type,
    title: input.title,
    message: input.message,
    metadata: input.metadata,
    read: false,
    createdAt: new Date(),
  });

  revalidatePath("/dashboard/notifications");
}

export async function markNotificationAsRead(notificationId: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const notification = await db.query.notifications.findFirst({
    where: eq(notifications.id, notificationId),
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  if (notification.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  await db
    .update(notifications)
    .set({
      read: true,
    })
    .where(eq(notifications.id, notificationId));

  revalidatePath("/dashboard/notifications");
}

export async function markAllNotificationsAsRead() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  await db
    .update(notifications)
    .set({
      read: true,
    })
    .where(eq(notifications.userId, user.id));

  revalidatePath("/dashboard/notifications");
}

export async function deleteNotification(notificationId: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const notification = await db.query.notifications.findFirst({
    where: eq(notifications.id, notificationId),
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  if (notification.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  await db
    .delete(notifications)
    .where(eq(notifications.id, notificationId));

  revalidatePath("/dashboard/notifications");
} 