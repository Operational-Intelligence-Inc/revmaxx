import type { BookingResult } from './booking-form'
import { Bullet, ToolCall } from './lines'
import { InstallSteps } from './outcome'

export function BookingOutcome({ result }: { result: BookingResult }) {
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
          <p>{"Got it, I'll go ahead and set up PostHog."}</p>
        </Bullet>
        <InstallSteps />
      </div>
    )
  }

  const { slot, answers } = result
  return (
    <div className="flex flex-col gap-5">
      <ToolCall
        name="posthog - book_intro_call (MCP)"
        args={`rep: "jordan.lee", slot: "${slot}"`}
        result={
          <p>
            <span className="text-sponsor">Booked</span>
            {' · ref PH-INTRO-7731'}
          </p>
        }
      />
      <ToolCall
        name="google-calendar - create_event (MCP)"
        args={'title: "PostHog intro call", attendees: 2, conferencing: "meet"'}
        result={<p>{`Added to ${answers.email} with a Google Meet link`}</p>}
      />
      <Bullet>
        <p className="text-pretty">
          {`You're booked with Jordan for ${slot}. The invite is on your calendar and Jordan will come prepared on "${answers.focus.toLowerCase()}". Meanwhile I'll install PostHog so you have real data to look at on the call.`}
        </p>
      </Bullet>
      <InstallSteps />
    </div>
  )
}
