import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import Link from 'next/link'
import {
  Brain,
  CalendarDays,
  PanelLeft,
  Search,
  Settings,
  Sparkles,
  Users2
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'
import {Button} from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {Input} from '@/components/ui/input'
import {auth} from '@clerk/nextjs/server'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {sessionClaims} = auth()
  const role =  sessionClaims?.metadata?.role

  return (
    <>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
              <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 py-4">
                  {role === 'admin' && <><Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                          href="#"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <Users2 className="h-5 w-5"/>
                        <span className="sr-only">Users</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Users</TooltipContent>
                  </Tooltip><Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                          href="#"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <Sparkles className="h-5 w-5"/>
                        <span className="sr-only">Startups</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Startups</TooltipContent>
                  </Tooltip>
                    <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                          href="#"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <CalendarDays className="h-5 w-5"/>
                        <span className="sr-only">Consultations</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Consultations</TooltipContent>
                  </Tooltip></>}
                  {role === 'startupper' && <><Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                          href="#"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <Brain className="h-5 w-5"/>
                        <span className="sr-only">Mentors</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Mentors</TooltipContent>
                  </Tooltip>
                    <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                          href="#"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <CalendarDays className="h-5 w-5"/>
                        <span className="sr-only">Consultations</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Consultations</TooltipContent>
                  </Tooltip></>}
                  {role === 'startup_admin' && <><Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                          href="#"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <Users2 className="h-5 w-5"/>
                        <span className="sr-only">Users</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Users</TooltipContent>
                  </Tooltip>
                    <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                          href="#"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <Brain className="h-5 w-5"/>
                        <span className="sr-only">Mentors</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Mentors</TooltipContent>
                  </Tooltip><Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                          href="#"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <CalendarDays className="h-5 w-5"/>
                        <span className="sr-only">Consultations</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Consultations</TooltipContent>
                  </Tooltip></>}
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                          href="#"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <Settings className="h-5 w-5" />
                        <span className="sr-only">Settings</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Settings</TooltipContent>
                  </Tooltip>
                </nav>
              </aside>
              <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="sm:max-w-xs">
                      <nav className="grid gap-6 text-lg font-medium">
                        {role === 'admin' && <>
                          <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                          <Users2 className="h-5 w-5"/>
                          Users
                        </Link>
                          <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                          <Sparkles className="h-5 w-5"/>
                          Startups
                        </Link>
                          <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-foreground"
                        >
                          <CalendarDays className="h-5 w-5"/>
                          Consultations
                        </Link>
                        </>}
                        {role === 'startupper' && <>
                          <Link
                              href="#"
                              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                          >
                            <Brain className="h-5 w-5"/>
                            Mentors
                          </Link>
                          <Link
                              href="#"
                              className="flex items-center gap-4 px-2.5 text-foreground"
                          >
                            <CalendarDays className="h-5 w-5"/>
                            Consultations
                          </Link>
                        </>}
                        {role === 'startup_admin' && <>
                          <Link
                              href="#"
                              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                          >
                            <Users2 className="h-5 w-5"/>
                            Users
                          </Link>
                          <Link
                              href="#"
                              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                          >
                            <Brain className="h-5 w-5"/>
                            Mentors
                          </Link>
                          <Link
                              href="#"
                              className="flex items-center gap-4 px-2.5 text-foreground"
                          >
                            <CalendarDays className="h-5 w-5"/>
                            Consultations
                          </Link>
                        </>}
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                          <Settings className="h-5 w-5" />
                          Settings
                        </Link>
                      </nav>
                    </SheetContent>
                  </Sheet>
                  <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link href="#">Dashboard</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link href="#">Products</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>All Products</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                  <div className="relative ml-auto flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                    />
                  </div>
                  <UserButton />
                </header>
                {children}
              </div>
            </div>
            </SignedIn>
    </>
  );
}
