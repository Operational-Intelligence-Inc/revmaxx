import { ImageResponse } from 'next/og'
import { SITE_NAME } from '@/lib/site'

export const alt = 'RevMaxx — Turn AI conversations into booked meetings'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          color: '#121212',
          padding: 72,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 64 64">
            <path fill="#121212" d="M5 32a24 24 0 0 1 48 0z" />
            <path fill="#f26b3a" d="M11 32h48a24 24 0 0 1-48 0z" />
          </svg>
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>{SITE_NAME}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3, maxWidth: 980 }}>
            Turn AI conversations into booked meetings.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 36, color: '#565656' }}>
            <div style={{ width: 16, height: 16, borderRadius: 16, background: '#f26b3a' }} />
            Keep 90% of every dollar spent.
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
