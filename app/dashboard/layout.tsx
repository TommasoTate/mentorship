import { UserButton } from "@clerk/nextjs";
import { getCurrentUser, requireAuth } from "@/lib/auth";
import Link from "next/link";
import { NotificationDropdown } from "@/components/notifications/notification-dropdown";
import { db } from "@/db";
import { desc, eq } from "drizzle-orm";
import { notifications } from "@/db/schema";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  // Fetch user's notifications
  const userNotifications = await db.query.notifications.findMany({
    where: eq(notifications.userId, user.id),
    orderBy: [desc(notifications.createdAt)],
    limit: 10,
  });

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Mentorship</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/dashboard">Dashboard</Link>
              {user?.role === "mentor" && (
                <Link href="/dashboard/sessions">Sessions</Link>
              )}
              {user?.role === "founder" && (
                <>
                  <Link href="/dashboard/startup">My Startup</Link>
                  <Link href="/dashboard/team">Team</Link>
                </>
              )}
              <Link href="/dashboard/mentors">Mentors</Link>
            </nav>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <NotificationDropdown notifications={userNotifications} />
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">{children}</div>
      </main>
    </div>
  );
} 