import type { ComponentType } from 'react'
import { V1Infra } from './v1-infra'
import { V2Convo } from './v2-convo'
import { V3Market } from './v3-market'
import { V4Terminal } from './v4-terminal'
import { V5Poster } from './v5-poster'

export type LandingVersion = {
  slug: string
  name: string
  headline: string
  direction: string
  inspiration: string
  palette: string[]
  Component: ComponentType
}

export const LANDING_VERSIONS: LandingVersion[] = [
  {
    slug: 'v1',
    name: 'Developer infra',
    headline: 'Integrated monetization for AI applications.',
    direction: 'Stripe-style API-first page. The code snippet is the hero; the pitch is "one call, then you get paid."',
    inspiration: 'Koah ("AdSense for AI"), and the API-first YC dev-tool playbook.',
    palette: ['#ffffff', '#0b1220', '#2552ff', '#f2f4f8'],
    Component: V1Infra,
  },
  {
    slug: 'v2',
    name: 'Show the conversation',
    headline: "Your AI could've booked that call.",
    direction: 'Product-led. A live-looking chat with an in-chat booking is the whole argument, then a before/after table.',
    inspiration: 'Thrad and ZeroClick, which lead with the in-chat ad unit itself.',
    palette: ['#eceff3', '#14171c', '#0e7a5f', '#ffffff'],
    Component: V2Convo,
  },
  {
    slug: 'v3',
    name: 'Two-sided marketplace',
    headline: 'Monetization network for AI agents.',
    direction: 'Speaks to builders and advertisers with a toggle, shows the exchange, and prices on outcomes.',
    inspiration: 'Gravity (full-stack DSP/SSP/exchange) and Kontext, which pitch both sides of the market.',
    palette: ['#f6f6f4', '#121a2b', '#1b2b52', '#ffb547'],
    Component: V3Market,
  },
  {
    slug: 'v4',
    name: 'Terminal-native (m10n.io)',
    headline: 'Ship monetization like you ship a feature.',
    direction: 'Uses the alternate m10n.io name. A CLI session shows intent → auction → payout for agent developers.',
    inspiration: 'Dev-first YC launches like Resend and Trigger.dev, applied to agent harnesses and MCP skills.',
    palette: ['#11131a', '#d8dbe3', '#8fb0ff', '#e7b56a'],
    Component: V4Terminal,
  },
  {
    slug: 'v5',
    name: 'Economics poster',
    headline: 'Links are worth cents. Leads are worth hundreds.',
    direction: 'Loud, typographic page built around the lead-gen insight, with the funnel shown side by side.',
    inspiration: 'Bold YC consumer-style pages, focused on the angle competitors miss: lead gen over display.',
    palette: ['#f9bd2b', '#111111', '#fffaf0'],
    Component: V5Poster,
  },
]
