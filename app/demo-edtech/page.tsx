import type { Metadata, Viewport } from 'next'
import { Sora } from 'next/font/google'
import { EdtechShell } from '@/components/edtech/edtech-shell'

const sora = Sora({ subsets: ['latin'], variable: '--font-sora' })

export const metadata: Metadata = {
  title: 'Aiko Demo — FAFSA Result & Private Loan Lead Gen',
  description:
    'A mock AI college-advisor chat: the student learns their FAFSA was approved, sees a $20,000 funding gap, and is offered a sponsored private student loan form.',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fff6f4',
}

export default function DemoEdtechPage() {
  return (
    <main className={`${sora.variable} min-h-dvh bg-aiko-bg font-aiko text-aiko-ink`}>
      <h1 className="sr-only">
        Aiko college advisor chat: FAFSA approved, with an offer to compare private student loans
      </h1>
      <EdtechShell />
    </main>
  )
}
