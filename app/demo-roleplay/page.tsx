import type { Metadata, Viewport } from 'next'
import { RoleplayShell } from '@/components/roleplay/roleplay-shell'

export const metadata: Metadata = {
  title: 'Roleplay Mockup — Princess Aurelia & Sponsored Travel Insurance',
  description:
    'A mock character roleplay chat where a cartoon princess discusses an Italy trip and surfaces a sponsored travel insurance quote form.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0e2226',
}

export default function DemoRoleplayPage() {
  return (
    <main className="min-h-dvh bg-palace font-sans text-palace-foreground">
      <h1 className="sr-only">Roleplay chat with Princess Aurelia, including a sponsored travel insurance offer</h1>
      <RoleplayShell />
    </main>
  )
}
