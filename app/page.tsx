import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser();
  const userId = user?.id;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Mentorship</h1>
        </div>
        <div className="flex items-center gap-4">
          {userId ? (
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Get Started</Button>
              </SignUpButton>
            </>
          )}
        </div>
      </header>

      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              Connect with Expert Mentors
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Accelerate your startup&apos;s growth with personalized mentorship from industry experts.
              Schedule sessions, track progress, and build lasting relationships.
            </p>
            {!userId && (
              <div className="space-x-4">
                <SignUpButton mode="modal">
                  <Button size="lg">Start Your Journey</Button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </SignInButton>
              </div>
            )}
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">For Startups</h3>
                  <p className="text-sm text-muted-foreground">
                    Get guidance from experienced mentors who&apos;ve been there before.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">For Mentors</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your expertise and help shape the next generation of startups.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Easy Scheduling</h3>
                  <p className="text-sm text-muted-foreground">
                    Seamless session booking and management with calendar integration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
