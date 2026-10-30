import type { Metadata } from 'next'
import { V10Grow } from '@/components/concept/landing/v10-grow'

export const metadata: Metadata = {
  title: 'RevMaxx — Turn conversations into booked meetings',
  description:
    'RevMaxx is the ad network for AI agents. Turn commercial intent in your AI into booked meetings and keep 90% of every dollar spent.',
}

export default function Page() {
  return <V10Grow />
}
