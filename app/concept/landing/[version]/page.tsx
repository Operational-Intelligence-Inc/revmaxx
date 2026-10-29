import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LANDING_VERSIONS } from '@/components/concept/landing/versions'

export function generateStaticParams() {
  return LANDING_VERSIONS.map((v) => ({ version: v.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ version: string }> }): Promise<Metadata> {
  const { version } = await params
  const match = LANDING_VERSIONS.find((v) => v.slug === version)
  return { title: match ? `RevMaxx — ${match.headline}` : 'RevMaxx' }
}

export default async function LandingVersionPage({ params }: { params: Promise<{ version: string }> }) {
  const { version } = await params
  const match = LANDING_VERSIONS.find((v) => v.slug === version)
  if (!match) notFound()
  const { Component } = match
  return <Component />
}
