// Fixes #3: the invite's calendar day was computed once, in one shared reference timezone, then
// shown to every recipient. Two recipients in different timezones could see different days for
// the same instant (R-41344: Lisbon saw Tuesday, Toronto saw Monday, same meeting). This computes
// the day in each recipient's own timezone instead of sharing one.

export function inviteDayFor(instantIso: string, recipientTimeZone: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: recipientTimeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(instantIso));
  const by = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return `${by.year}-${by.month}-${by.day}`;
}
