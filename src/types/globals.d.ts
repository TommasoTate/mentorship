export {}

declare global {
  type Role = 'admin' | 'startupper' | 'mentor' | 'startup_admin'
  type Status = 'pending' | 'approved' | 'rejected'
  type Metadata = {
    role: Role
    calendarLink?: string
    status: Status
    name: string
  }
  interface CustomJwtSessionClaims {
    metadata: Metadata
  }
}
