export {}

declare global {
  type Role = 'admin' | 'startupper' | 'mentor' | 'startup-admin'
  type Metadata = {
    role: Role
    onboardingComplete: boolean
  }
  interface CustomJwtSessionClaims {
    metadata: Metadata
  }
}
