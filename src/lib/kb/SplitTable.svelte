<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { groupByCause, oneDayMoveGroup, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  let { ticket }: { ticket: number } = $props();

  const merged = $derived(uniqueById(reports as Report[]).filter((r) => r.mergedInto === ticket));
  // parser/hint: the desk's own existing grouping, unchanged.
  const causeGroups = $derived(groupByCause(merged, tenantOf));
  // timezone: the desk's own oneDayMove list, read as its own problem instead of a footnote.
  const timezone = $derived(oneDayMoveGroup(merged, notes.oneDayMove));
  const rows = $derived([...causeGroups, timezone]);

  const WHAT: Record<string, string> = {
    parser: 'the shared parser reads every date month-first',
    hint: "booking-v3's on-screen hint says MM/DD/YYYY to day-first tenants",
    timezone: 'the invite day is computed in the wrong timezone for some recipients (counted inside parser above, too)',
  };
</script>

<p class="sum">
  <strong>{merged.length}</strong> reports merged into #{ticket} ·
  <strong>{rows.length}</strong> real problems
</p>

<table>
  <thead>
    <tr><th>cause</th><th>what it is</th><th>reports</th><th>tenants</th><th>seen</th></tr>
  </thead>
  <tbody>
    {#each rows as g (g.cause)}
      <tr>
        <td><code>{g.cause}</code></td>
        <td>{WHAT[g.cause] ?? g.cause}</td>
        <td>{g.reports.length}</td>
        <td>{g.tenants}</td>
        <td>{g.firstSeen} → {g.lastSeen}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .sum { font-size: 1.1rem; }
</style>
