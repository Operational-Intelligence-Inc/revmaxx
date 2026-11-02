import type { BookingResult } from '../booking-form'
import { Bullet, ToolCall } from '../lines'

export function LiveBookingOutcome({ result }: { result: BookingResult }) {
  if (result.type !== 'booked') {
    return (
      <Bullet>
        <p className="text-pretty">{"No problem. I'll keep going with the setup."}</p>
      </Bullet>
    )
  }

  const { slot, answers } = result
  const contextShared = answers.context?.startsWith('Yes') ?? false
  const prepNote = contextShared
    ? `Jordan has your project summary and will come prepared on "${answers.focus.toLowerCase()}".`
    : `Jordan will come prepared on "${answers.focus.toLowerCase()}".`
  return (
    <div className="flex flex-col gap-5">
      <ToolCall
        name="posthog - book_intro_call (MCP)"
        args={`rep: "jordan.lee", slot: "${slot}"${contextShared ? ', context: "project summary"' : ''}`}
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
          {`You're booked with Jordan for ${slot}. The invite is on your calendar. ${prepNote} I'm still finishing the PostHog setup in the background.`}
        </p>
      </Bullet>
    </div>
  )
}
