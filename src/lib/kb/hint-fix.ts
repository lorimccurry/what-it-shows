// Fixes #2: booking-v3's on-screen date hint always said "MM/DD/YYYY", even to tenants whose
// locale writes the day first. People who trusted the hint typed month-first and got flipped
// dates through a different path than the parser bug (#1) — same symptom, different cause, so a
// different fix: the hint has to match the tenant, not the form version.

import { dayFirst, type Tenant } from '#lib/kb/causes';

export function correctDateHint(tenant: Pick<Tenant, 'locale'>): string {
  return dayFirst(tenant.locale) ? 'DD/MM/YYYY' : 'MM/DD/YYYY';
}
