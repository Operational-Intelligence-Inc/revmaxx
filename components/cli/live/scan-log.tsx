import { Bullet, ToolCall } from '../lines'

export const SCAN_STEPS = [
  { name: 'Read', args: 'package.json', result: 'Read 48 lines' },
  {
    name: 'Search',
    args: 'pattern: "analytics|gtag|posthog|segment|plausible|mixpanel", path: "."',
    result: 'Found 0 files',
  },
  { name: 'Glob', args: 'app/**/*.{ts,tsx}', result: 'Found 37 files' },
  { name: 'Read', args: 'app/layout.tsx', result: 'Read 62 lines' },
  {
    name: 'Search',
    args: 'pattern: "signup|checkout|onSubmit", path: "app, components"',
    result: 'Found 6 files',
  },
] as const

export const SCAN_DURATIONS = [1000, 1100, 900, 1000, 1200] as const

export const ANALYTICS_OPTIONS = [
  {
    name: 'PostHog',
    body: 'Product analytics, session replay, feature flags and A/B tests in one SDK. Free up to 1M events/mo, with a first-class Next.js integration.',
  },
  {
    name: 'Vercel Web Analytics',
    body: "Zero-config page views and Web Vitals. You're already deployed on Vercel, but it won't give you funnels or per-user journeys.",
  },
  {
    name: 'Plausible',
    body: 'Lightweight, cookie-less and privacy-first. Great for marketing pages, thinner for in-app product questions.',
  },
  {
    name: 'Google Analytics 4',
    body: 'Free and ubiquitous, but a heavier script and a cookie-consent banner in most regions.',
  },
] as const

export function ScanLog({ stage }: { stage: number }) {
  return (
    <div className="flex flex-col gap-5">
      {SCAN_STEPS.map(
        (step, i) =>
          i <= stage && (
            <ToolCall
              key={`${step.name}-${step.args}`}
              name={step.name}
              args={step.args}
              result={i < stage ? <p>{step.result}</p> : <p className="animate-pulse">Running…</p>}
            />
          ),
      )}

      {stage >= SCAN_STEPS.length && <Recommendation />}
    </div>
  )
}

function Recommendation() {
  return (
    <Bullet>
      <p className="text-pretty">
        {
          'This is a Next.js 16 App Router project on Vercel with no analytics installed yet, and your signup and checkout flows are where user behavior matters most. Here are the options that fit, with the trade-offs:'
        }
      </p>
      <ol className="flex flex-col gap-3">
        {ANALYTICS_OPTIONS.map((option, i) => (
          <li key={option.name} className="flex">
            <span className="w-[3ch] shrink-0 text-terminal-muted">{`${i + 1}.`}</span>
            <div className="flex min-w-0 flex-col">
              <p className="font-bold">{option.name}</p>
              <p className="text-pretty text-terminal-muted">{option.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="text-pretty">
        {
          'To understand what users do in your signup and checkout flows (funnels, retention, replays), PostHog fits best. If you only need page views and Web Vitals, Vercel Web Analytics is the lighter choice. These picks come from your project alone, and none of them are sponsored.'
        }
      </p>
    </Bullet>
  )
}
