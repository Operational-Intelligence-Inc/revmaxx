export const SLOTS_PER_DAY = 16
const DAY_START_HOUR = 9

export type Day = { label: string; you: number[]; rep: number[] }

export const DAYS: Day[] = [
  { label: 'Wed Oct 28', you: [0, 1, 2, 8, 9, 14, 15], rep: [3, 4, 10, 11, 12] },
  { label: 'Thu Oct 29', you: [0, 1, 4, 5, 6, 7], rep: [2, 3, 8, 9, 10, 11, 12, 13] },
  { label: 'Fri Oct 30', you: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15], rep: [0, 1, 2] },
  { label: 'Mon Nov 2', you: [0, 1, 2, 3], rep: [4, 5, 6, 7, 8, 9] },
  { label: 'Tue Nov 3', you: [2, 3, 10, 11], rep: [0, 1, 4, 5, 6, 7, 8, 9, 12, 13, 14, 15] },
]

export type CellState = 'you' | 'rep' | 'open'

export function cellState(day: Day, slot: number): CellState {
  if (day.you.includes(slot)) return 'you'
  if (day.rep.includes(slot)) return 'rep'
  return 'open'
}

export function slotTime(slot: number) {
  const minutes = (DAY_START_HOUR * 60 + slot * 30) % (24 * 60)
  const h24 = Math.floor(minutes / 60)
  const m = minutes % 60
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  return `${h12}:${m === 0 ? '00' : m} ${h24 < 12 ? 'AM' : 'PM'}`
}

export function slotRange(slot: number) {
  return `${slotTime(slot)}–${slotTime(slot + 1)} PT`
}

export const HOUR_LABELS = Array.from({ length: SLOTS_PER_DAY / 2 }, (_, i) => {
  const h = DAY_START_HOUR + i
  return String(h % 12 === 0 ? 12 : h % 12).padEnd(4, ' ')
})

const PICKS: [number, number][] = [
  [0, 6],
  [0, 13],
  [1, 14],
  [2, 4],
  [3, 10],
]

export const MUTUAL_SLOTS = PICKS.map(([dayIndex, slot]) => ({
  dayIndex,
  slot,
  label: `${DAYS[dayIndex].label} · ${slotRange(slot)}`,
}))

export const MUTUAL_OPEN_COUNT = DAYS.reduce(
  (sum, day) =>
    sum + Array.from({ length: SLOTS_PER_DAY }, (_, s) => cellState(day, s)).filter((c) => c === 'open').length,
  0,
)
