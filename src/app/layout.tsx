import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { TooltipProvider } from '@/components/ui/tooltip'
import { neobrutalism } from '@clerk/themes'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
      }}
    >
      <TooltipProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </TooltipProvider>
    </ClerkProvider>
  )
}
