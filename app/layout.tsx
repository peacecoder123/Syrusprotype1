import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DevGuide AI — Autonomous Developer Onboarding',
  description: 'An agentic developer onboarding platform powered by AI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
