import { Bullet, ToolCall } from './lines'
import type { FormResult } from './sponsored-form'

export function InstallSteps() {
  return (
    <>
      <ToolCall
        name="Bash"
        args="pnpm add posthog-js"
        result={<p>{'+ posthog-js 1.236.0 · Done in 2.1s'}</p>}
      />
      <ToolCall
        name="Write"
        args="app/providers.tsx"
        result={<p>Wrote 24 lines to app/providers.tsx</p>}
      />
      <ToolCall
        name="Update"
        args="app/layout.tsx"
        result={<p>Updated app/layout.tsx with 3 additions and 1 removal</p>}
      />
      <Bullet>
        <p className="text-pretty">
          {'PostHog is installed. Add '}
          <span className="text-terminal-accent">NEXT_PUBLIC_POSTHOG_KEY</span>
          {' to your '}
          <span className="text-terminal-accent">.env.local</span>
          {" and pageviews, autocapture and session replay will start flowing. Want me to add custom events for signup and checkout next?"}
        </p>
      </Bullet>
    </>
  )
}

export function Outcome({ result }: { result: FormResult }) {
  if (result.type === 'other') {
    return (
      <Bullet>
        <p className="text-pretty">
          {
            'No problem. Which would you like instead: Vercel Web Analytics, Plausible, or Google Analytics 4? I can also combine Vercel Web Analytics for Web Vitals with any of the others.'
          }
        </p>
      </Bullet>
    )
  }

  if (result.type === 'declined') {
    return (
      <div className="flex flex-col gap-5">
        <Bullet>
          <p>{"Got it, I'll set up PostHog on the free tier. You can apply for credits later at posthog.com/startups."}</p>
        </Bullet>
        <InstallSteps />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <ToolCall
        name="PostHog for Startups"
        args="submit application"
        result={
          <p>
            <span className="text-sponsor">Application received</span>
            {` · ref PHS-48213 · confirmation sent to ${result.answers.email}`}
          </p>
        }
      />
      <Bullet>
        <p className="text-pretty">
          {`Submitted. PostHog usually reviews startup applications within a few business days and will email ${result.answers.email}. In the meantime I'll install PostHog so data starts collecting right away. The credits apply retroactively once approved.`}
        </p>
      </Bullet>
      <InstallSteps />
    </div>
  )
}
