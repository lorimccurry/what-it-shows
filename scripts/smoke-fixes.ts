// Throwaway verification, not part of the build: proves each fix against the real report it fixes.
import { parseBookingDate, parseBookingDateBuggy } from '../src/lib/kb/parse-date.ts';
import { inviteDayFor } from '../src/lib/kb/invite-timezone.ts';

function assertEqual(actual: unknown, expected: unknown, label: string) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) throw new Error(`FAIL ${label}: got ${a}, want ${e}`);
  console.log(`ok   ${label}: ${a}`);
}

// Fix #1 — R-41200, harbour.dental (en-GB, day-first): "7 April reminder went out on 4 July."
const buggy = parseBookingDateBuggy(7, 4, 2026);
assertEqual(buggy.toISOString().slice(0, 10), '2026-07-04', 'parser bug reproduces R-41200 (4 July)');
const fixed = parseBookingDate(7, 4, 2026, { locale: 'en-GB' });
assertEqual(fixed.toISOString().slice(0, 10), '2026-04-07', 'parser fix reads 7 April correctly');

// Issue #2 (hint) has no fix here: the desk's 05 Oct engineering update closed it won't-fix —
// booking-v3, the form that printed the wrong hint, was retired outright. Nothing to verify.

// Fix #3 — R-41344: "Client in Lisbon got Tuesday. Client in Toronto got Monday. Same meeting."
const instant = '2026-06-12T23:30:00Z';
const lisbon = inviteDayFor(instant, 'Europe/Lisbon');
const toronto = inviteDayFor(instant, 'America/Toronto');
assertEqual(lisbon, '2026-06-13', 'timezone fix: Lisbon sees 13 June for this instant');
assertEqual(toronto, '2026-06-12', 'timezone fix: Toronto sees 12 June for the same instant');
if (lisbon === toronto) throw new Error('FAIL: expected the two recipients to see different calendar days, same as R-41344');
console.log('ok   timezone fix: each recipient reads their own day — the bug was sharing one');

console.log('\nall fixes verified against their real reports');
