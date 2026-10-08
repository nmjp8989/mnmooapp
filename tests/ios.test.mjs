import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const section = html.slice(html.indexOf('const RC_APPLE_API_KEY'), html.indexOf('async function checkProStatus'));
function app(platform, key = '', store = 'google') {
  const calls = [];
  const context = vm.createContext({
    logDebug() {}, updateProUI() {},
    async checkProStatus() {}, async loadOfferings() {},
    Capacitor: {
      getPlatform: () => platform,
      Plugins: {
        StoreDetector: { async getStore() { calls.push('detector'); return { store }; } },
        Purchases: {
          async configure(config) { calls.push(JSON.parse(JSON.stringify(config))); },
          async addCustomerInfoUpdateListener(options, callback) {
            assert.equal(typeof options, 'object');
            assert.equal(typeof callback, 'function');
            callback({ entitlements: { active: { mnmoo_pro: {} } } });
          },
        },
      },
    },
  });
  vm.runInContext(section.replace("const RC_APPLE_API_KEY = '';", `const RC_APPLE_API_KEY = ${JSON.stringify(key)};`), context);
  return { calls, context };
}
test('iOS uses Apple key and never invokes Android store detector', async () => {
  const { calls, context } = app('ios', 'appl_test123');
  await context.initRevenueCat();
  assert.deepEqual(calls, [{ apiKey: 'appl_test123' }]);
  assert.equal(vm.runInContext('rcReady', context), true);
});
test('iOS missing/wrong key fails closed instead of using Google', async () => {
  for (const key of ['', 'goog_wrong', 'sk_secret']) {
    const { calls, context } = app('ios', key);
    await context.initRevenueCat();
    assert.deepEqual(calls, []);
    assert.equal(vm.runInContext('rcReady', context), false);
    assert.equal(vm.runInContext('isPro', context), false);
  }
});
test('Google and Amazon routing remains intact', async () => {
  for (const store of ['google', 'amazon']) {
    const { calls, context } = app('android', '', store);
    await context.initRevenueCat();
    assert.equal(calls[0], 'detector');
    assert.ok(calls[1].apiKey.startsWith(store === 'amazon' ? 'amzn_' : 'goog_'));
    assert.equal(calls[1].useAmazon, store === 'amazon' ? true : undefined);
  }
});
test('only the configured active entitlement grants Pro', () => {
  const { context } = app('ios');
  assert.equal(context.checkIsPro({ entitlements: { active: { mnmoo_pro: {} } } }), true);
  assert.equal(context.checkIsPro({ entitlements: { active: { other: {} } } }), false);
  assert.equal(context.checkIsPro(null), false);
});
test('Apple logo taps cannot unlock Pro', () => {
  const { context } = app('ios');
  vm.runInContext(html.slice(html.indexOf('var logoTapCount'), html.indexOf('const MUSIC_SRC')), context);
  for (let i = 0; i < 10; i++) context.logoTap();
  assert.equal(vm.runInContext('isPro', context), false);
});
test('signed asset build refuses missing Apple key before copying files', () => {
  const result = spawnSync(process.execPath, ['scripts/build-ios.mjs'], {
    env: { ...process.env, RC_APPLE_API_KEY: '', IOS_SIMULATOR_BUILD: '' }, encoding: 'utf8',
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Set RC_APPLE_API_KEY/);
});
test('all inline app JavaScript parses', () => {
  for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) new vm.Script(match[1]);
});

test('purchase errors accept string and numeric cancellation and ownership codes', async () => {
  const purchase = html.slice(html.indexOf('async function doPurchase()'), html.indexOf('async function doRestore()'));
  for (const code of [1, '1', 6, '6', 2, '2']) {
    const alerts = [];
    let restores = 0;
    const context = vm.createContext({
      rcReady: true, rcOfferings: {}, selectedPlan: 'monthly',
      getPackageForPlan: () => ({ identifier: '$rc_monthly' }),
      logDebug() {}, alert: message => alerts.push(message),
      doRestore: async () => { restores++; },
      Capacitor: { Plugins: { Purchases: { purchasePackage: async () => { throw { code }; } } } },
    });
    vm.runInContext(purchase, context);
    await context.doPurchase();
    assert.equal(restores, Number(code) === 6 ? 1 : 0);
    assert.equal(alerts.length, Number(code) === 2 ? 1 : 0);
  }
});
