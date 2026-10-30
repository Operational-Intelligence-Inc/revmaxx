export const SITE_NAME = 'RevMaxx'

export const SITE_TAGLINE = 'The ad network for AI agents'

export const SITE_DESCRIPTION =
  'RevMaxx is the ad network for AI agents. Turn commercial intent in your conversations into booked meetings, and keep 90% of every dollar spent.'

export const SITE_KEYWORDS = [
  'AI agent monetization',
  'ad network for AI agents',
  'conversational advertising',
  'monetize AI app',
  'AI chat ads',
  'MCP monetization',
  'booked meetings',
  'pay per meeting advertising',
  'intent-based advertising',
]

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

export const SITE_URL = resolveSiteUrl()
