'use client'

import { useEffect, useState } from 'react'

/** Advances a counter from 0 to durations.length, waiting durations[n] ms before each increment. */
export function useStepper(active: boolean, durations: readonly number[]) {
  const [completed, setCompleted] = useState(0)

  useEffect(() => {
    if (!active || completed >= durations.length) return
    const timer = setTimeout(() => setCompleted((c) => c + 1), durations[completed])
    return () => clearTimeout(timer)
  }, [active, completed, durations])

  return completed
}

const SPINNER_FRAMES = ['·', '+', '×', '*', '×', '+']

export function useSpinnerGlyph() {
  const [frame, setFrame] = useState(3)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => setFrame((f) => (f + 1) % SPINNER_FRAMES.length), 140)
    return () => clearInterval(timer)
  }, [])

  return SPINNER_FRAMES[frame]
}

export function useElapsedSeconds() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  return seconds
}
