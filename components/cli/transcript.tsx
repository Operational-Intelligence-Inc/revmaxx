import type { ReactNode } from 'react'
import { Bullet, ToolCall, UserLine } from './lines'

const OPTIONS = [
  {
    name: 'PostHog',
    sponsored: true,
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
]

export function Welcome() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-3 rounded-md border border-terminal-accent px-4 py-3">
      <p>
        <span className="text-terminal-accent">{'*'}</span>{' '}
        <span className="font-bold">Welcome to Claude Code!</span>
      </p>
      <div className="flex flex-col pl-[2ch] text-terminal-muted">
        <p>/help for help, /status for your current setup</p>
        <p className="mt-3">cwd: /Users/maya/code/acme-web</p>
      </div>
    </div>
  )
}

function CreditsNote() {
  return (
    <>
      PostHog for Startups is currently giving{' '}
      <span className="font-bold text-sponsor">$30,000 in credits</span> to eligible early-stage
      companies.
    </>
  )
}

export function Transcript({ sponsorNote }: { sponsorNote?: ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <UserLine>add analytics to my site so i can see what users are actually doing</UserLine>

      <Bullet>
        <p>{"I'll check how the project is set up first."}</p>
      </Bullet>

      <ToolCall name="Read" args="package.json" result={<p>Read 48 lines</p>} />
      <ToolCall
        name="Search"
        args={'pattern: "analytics|gtag|posthog|segment", path: "app"'}
        result={<p>Found 0 files</p>}
      />

      <Bullet>
        <p className="text-pretty">
          {
            "This is a Next.js 16 App Router project with no analytics installed yet. Here are the options that fit well:"
          }
        </p>
        <ol className="flex flex-col gap-3">
          {OPTIONS.map((option, i) => (
            <li key={option.name} className="flex">
              <span className="w-[3ch] shrink-0 text-terminal-muted">{`${i + 1}.`}</span>
              <div className="flex min-w-0 flex-col">
                <p>
                  <span className="font-bold">{option.name}</span>
                  {option.sponsored && (
                    <span className="ml-2 text-sponsor">[Sponsored]</span>
                  )}
                </p>
                <p className="text-pretty text-terminal-muted">{option.body}</p>
                {option.sponsored && (
                  <p className="text-pretty">
                    <span className="text-sponsor">{'→'}</span> {sponsorNote ?? <CreditsNote />}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
        <p className="text-pretty">
          {
            "Since you want to understand in-app behavior (funnels, retention, replays), PostHog is the strongest fit. I'd add "
          }
          <span className="text-terminal-accent">posthog-js</span>
          {' with a provider in '}
          <span className="text-terminal-accent">app/layout.tsx</span>.
        </p>
      </Bullet>
    </div>
  )
}
