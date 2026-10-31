// Fixes #1: the booking date parser read every incoming date as MM/DD, no matter the tenant.
// Day-first locale tenants (locales.ts) got day and month silently swapped.

import { dayFirst, type Tenant } from '#lib/kb/causes';

// The old, buggy behavior — kept only so the fix is provably different from it.
export function parseBookingDateBuggy(a: number, b: number, year: number): Date {
  return new Date(Date.UTC(year, a - 1, b)); // always reads `a` as month, `b` as day
}

// The fix: read the two numbers in the tenant's own locale order, not a fixed MM/DD.
export function parseBookingDate(a: number, b: number, year: number, tenant: Pick<Tenant, 'locale'>): Date {
  const [month, day] = dayFirst(tenant.locale) ? [b, a] : [a, b];
  return new Date(Date.UTC(year, month - 1, day));
}
