import { getCurrentUser } from "@/lib/auth";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { sessions } from "@/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  // Fetch upcoming sessions
  const upcomingSessions = await db.query.sessions.findMany({
    where: user.role === "mentor" 
      ? eq(sessions.mentorId, user.id)
      : eq(sessions.requesterId, user.id),
    with: {
      mentor: true,
      requester: true,
      startup: true,
    },
    limit: 5,
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
        {user.role !== "mentor" && (
          <Button asChild>
            <Link href="/dashboard/mentors">Find a Mentor</Link>
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between space-x-4"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.role === "mentor"
                          ? session.requester.name
                          : session.mentor.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(session.scheduledAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href={`/dashboard/sessions/${session.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No upcoming sessions scheduled.
              </p>
            )}
          </CardContent>
        </Card>

        {user.role === "mentor" && (
          <Card>
            <CardHeader>
              <CardTitle>Session Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View and manage your session requests.
              </p>
              <Button className="mt-4" asChild>
                <Link href="/dashboard/sessions">View All Requests</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {user.role === "founder" && (
          <Card>
            <CardHeader>
              <CardTitle>My Startup</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage your startup profile and team members.
              </p>
              <Button className="mt-4" asChild>
                <Link href="/dashboard/startup">Manage Startup</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.role === "mentor" ? (
                <>
                  <Button className="w-full" asChild>
                    <Link href="/dashboard/profile">Update Profile</Link>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/dashboard/availability">Manage Availability</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button className="w-full" asChild>
                    <Link href="/dashboard/mentors">Find Mentors</Link>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/dashboard/sessions">View All Sessions</Link>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 