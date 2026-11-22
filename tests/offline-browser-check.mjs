#!/usr/bin/env node
import assert from 'node:assert/strict';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const target = process.argv[2];
if (!target) throw new Error('Usage: node tests/offline-browser-check.mjs <offline.html>');
const fileUrl = pathToFileURL(path.resolve(target)).href;
const browser = await chromium.launch({
  headless: true,
  args: [
    '--enable-webgl',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--disable-gpu-sandbox',
    '--no-sandbox'
  ]
});

try {
  const context = await browser.newContext();
  await context.setOffline(true);
  const page = await context.newPage();
  const pageErrors = [];
  const networkRequests = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  page.on('request', request => {
    if (/^https?:/i.test(request.url())) networkRequests.push(request.url());
  });
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForFunction(() => !!window.EVA_SPHERE, { timeout: 60000 });

  const startup = await page.evaluate(() => {
    const canvas = document.querySelector('#stage canvas');
    return {
      scene: !!window.EVA_SPHERE,
      canvas: !!canvas,
      canvasWidth: canvas?.width || 0,
      canvasHeight: canvas?.height || 0,
      loadingText: document.getElementById('loading')?.textContent || '',
      pageProtocol: location.protocol,
      overlay: !!document.getElementById('objectDetailOverlay')
    };
  });

  assert.equal(startup.pageProtocol, 'file:');
  assert.equal(startup.scene, true);
  assert.equal(startup.canvas, true);
  assert.ok(startup.canvasWidth > 0 && startup.canvasHeight > 0, 'WebGL canvas must have dimensions');
  assert.equal(startup.overlay, true);

  const menu = page.locator('#navCollapseBtn');
  if (await menu.count()) {
    await menu.click();
    await page.waitForTimeout(180);
    const collapsed = await page.locator('#appShell').evaluate(el => el.classList.contains('nav-collapsed'));
    assert.equal(collapsed, true, 'desktop navigation collapse behaviour must remain available');
  }

  assert.deepEqual(networkRequests, [], 'No HTTP(S) request may be required during offline startup');
  assert.deepEqual(pageErrors, [], 'No uncaught JavaScript errors are expected on startup');

  console.log(JSON.stringify({
    result: 'PASS',
    mode: 'file:// with Playwright context offline',
    startup,
    networkRequests,
    pageErrors
  }, null, 2));
} finally {
  await browser.close();
}
