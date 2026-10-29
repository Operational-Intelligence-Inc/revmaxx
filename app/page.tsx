import type { Metadata } from 'next'
import { HomeLanding } from '@/components/home/home-landing'

export const metadata: Metadata = {
  title: 'RevMaxx — Turn every conversation into revenue',
  description:
    'RevMaxx connects high-intent moments inside AI chat to relevant partner offers, so apps earn more without breaking the experience.',
}

export default function Page() {
  return <HomeLanding />
}
