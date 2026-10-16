import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
const checks = ['geometry','typography','route-continuity','keyboard-focus','motion-reversal','reduced-motion','responsive-zoom','search-scope'];
export function checkNavigation(routes, evidence) {
  if (!Array.isArray(routes) || !routes.length || routes.some(x => typeof x !== 'string' || !x.startsWith('/')) || new Set(routes).size !== routes.length) throw new Error('routes must be a non-empty unique array of route patterns from the real router');
  if (!evidence || !Array.isArray(evidence.routes) || evidence.inventorySource !== 'application-router') throw new Error('evidence.inventorySource must be application-router with routes[]');
  const issues = [], seen = new Set(); let baseline;
  for (const row of evidence.routes) {
    const route = row.route;
    if (seen.has(route)) issues.push(`${route}: duplicate evidence`);
    seen.add(route);
    if (!routes.includes(route)) issues.push(`${route}: not in router inventory`);
    if (row.exception) {
      if (!row.exception.reason?.trim() || !row.exception.approval?.trim()) issues.push(`${route}: exception needs reason and approval evidence`);
      continue;
    }
    for (const key of ['shellId','stateOwner','navigationOwner']) if (!row[key]?.trim()) issues.push(`${route}: missing ${key}`);
    const owner = ['shellId','stateOwner','navigationOwner'].map(k=>row[k]).join('|');
    baseline ??= owner;
    if (owner !== baseline) issues.push(`${route}: shell or controller forks from baseline`);
    for (const key of checks) {
      const result = row.checks?.[key];
      if (key === 'search-scope' && result?.status === 'not-applicable' && result.reason?.trim()) continue;
      if (result?.status !== 'pass' || !result.evidence?.trim()) issues.push(`${route}/${key}: failed, unverified or missing evidence`);
    }
  }
  for (const route of routes) if (!seen.has(route)) issues.push(`${route}: missing route coverage`);
  return { passed:issues.length === 0, checkedRoutes:seen.size, issues, boundary:'Validates submitted evidence, not actual browser behavior or completeness of supplied router inventory.' };
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (process.argv.length !== 4) throw new Error('Usage: node check-navigation.mjs routes.json evidence.json');
    const result = checkNavigation(JSON.parse(readFileSync(process.argv[2],'utf8')), JSON.parse(readFileSync(process.argv[3],'utf8')));
    console.log(JSON.stringify(result,null,2)); process.exitCode = result.passed ? 0 : 1;
  } catch (error) { console.error(error.message); process.exitCode = 2; }
}
