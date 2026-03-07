// ─── Configurable slot settings ───────────────────────────────────────────────

/** Maximum number of people (sum of people_count) that can book a single slot. */
export const SLOT_MAX_CAPACITY = 30;

/** Available dates in ISO format (YYYY-MM-DD). */
export const SLOT_DATES = ['2026-03-28', '2026-03-29'] as const;

/** Available times for each date. */
export const SLOT_TIMES = ['10:30', '13:00', '15:30'] as const;

// ─── Derived types ─────────────────────────────────────────────────────────────

export type SlotDate = (typeof SLOT_DATES)[number];
export type SlotTime = (typeof SLOT_TIMES)[number];

/** Canonical slot identifier stored in the database, e.g. "2026-03-28T10:30" */
export type SlotId = `${SlotDate}T${SlotTime}`;

/** All valid slot IDs. */
export const VALID_SLOT_IDS = new Set<string>(
  SLOT_DATES.flatMap((date) => SLOT_TIMES.map((time) => `${date}T${time}`))
);

// ─── Display helpers ───────────────────────────────────────────────────────────

const DE_DAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

/** Returns a German label for a date, e.g. "Sa, 28.03.2026" */
export function formatSlotDate(date: SlotDate): string {
  const d = new Date(`${date}T00:00:00`);
  const dayName = DE_DAYS[d.getDay()];
  const [year, month, day] = date.split('-');
  return `${dayName}, ${day}.${month}.${year}`;
}
