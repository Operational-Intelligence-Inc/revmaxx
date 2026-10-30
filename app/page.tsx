import type { Metadata } from 'next'
import { V10Grow } from '@/components/concept/landing/v10-grow'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'

const TITLE = 'RevMaxx — Turn AI conversations into booked meetings'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: { title: TITLE, description: SITE_DESCRIPTION, url: '/' },
  twitter: { card: 'summary_large_image', title: TITLE, description: SITE_DESCRIPTION },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      description: SITE_DESCRIPTION,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <V10Grow />
    </>
  )
}
