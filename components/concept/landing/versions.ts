import type { ComponentType } from 'react'
import { V1Infra } from './v1-infra'
import { V2Convo } from './v2-convo'
import { V3Market } from './v3-market'
import { V4Terminal } from './v4-terminal'
import { V5Poster } from './v5-poster'
import { V6Ledger } from './v6-ledger'
import { V7Collage } from './v7-collage'
import { V8Reel } from './v8-reel'
import { V9Livo } from './v9-livo'
import { V10Grow } from './v10-grow'

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
  {
    slug: 'v6',
    name: 'Fintech ledger',
    headline: 'Monetization network for AI agents.',
    direction: 'Finpay-style full page: hero with payout card, feature card, bento with earnings chart, navy steps band, outcome-priced plans.',
    inspiration: 'Reference screenshot 1 (Finpay) — calm mint/teal/navy fintech layout.',
    palette: ['#f2f7f7', '#0b2f3f', '#2a8b93', '#ffffff'],
    Component: V6Ledger,
  },
  {
    slug: 'v7',
    name: 'Collage poster',
    headline: 'Leads are worth hundreds.',
    direction: 'Grainy indigo poster with a cut-out photo collage, an oversized extended-display word, pill CTA and badge.',
    inspiration: 'Reference screenshot 2 ("Marketing done easy").',
    palette: ['#1d1b4c', '#f5c233', '#f2514f', '#6c4cf1', '#ffffff'],
    Component: V7Collage,
  },
  {
    slug: 'v8',
    name: 'Floating cards',
    headline: "Your AI could've booked that call.",
    direction: 'Centered serif headline over a phone showing the in-chat booking, surrounded by pastel stat and photo cards.',
    inspiration: 'Reference screenshot 3 (reel.ai).',
    palette: ['#ffffff', '#161616', '#fbe07a', '#bdf0b4', '#f7c6f1'],
    Component: V8Reel,
  },
  {
    slug: 'v9',
    name: 'Live auction',
    headline: 'Monetization network for AI agents.',
    direction: 'Gradient-framed card with a gradient keyword, a live-auction panel and call-style participant tiles.',
    inspiration: 'Reference screenshot 4 (Livo AI).',
    palette: ['#8b3fd9', '#f08a4b', '#fff1ef', '#121212', '#ffffff'],
    Component: V9Livo,
  },
  {
    slug: 'v10',
    name: 'Editorial Earn+',
    headline: 'Earn+',
    direction: 'Huge serif one-word hero on a fog-gray panel, editorial founder photo with glass payout and booking cards, then demo, cents-vs-hundreds math, advertiser goals, steps, team and CTA.',
    inspiration: 'Reference screenshot 5 (Reeloo "Grow+").',
    palette: ['#ffffff', '#e4e4e4', '#121212', '#f26b3a'],
    Component: V10Grow,
  },
]
