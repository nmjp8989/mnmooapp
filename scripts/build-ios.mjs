import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const key = process.env.RC_APPLE_API_KEY || '';
const simulator = process.env.IOS_SIMULATOR_BUILD === '1';
if (!/^appl_[A-Za-z0-9]+$/.test(key) && !(simulator && !key)) {
  throw new Error('Set RC_APPLE_API_KEY to the Apple public SDK key from RevenueCat (appl_...). Only simulator builds may omit it.');
}
execFileSync('npm', ['run', 'build'], { stdio: 'inherit' });
const path = 'www/index.html';
const source = readFileSync(path, 'utf8');
const marker = "const RC_APPLE_API_KEY = '';";
if (!source.includes(marker)) throw new Error('Missing Apple configuration marker');
writeFileSync(path, source.replace(marker, `const RC_APPLE_API_KEY = ${JSON.stringify(key)};`));
console.log(key ? 'iOS assets configured with Apple RevenueCat.' : 'Simulator assets built without purchases.');
