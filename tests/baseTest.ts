import { test as base, expect } from '@playwright/test';
import { Application } from '../src/app/application';
import { PageSession } from '@core';

type TestFixtures = {
  app: Application;
};

export const test = base.extend<TestFixtures>({
  app: async ({}, use) => {
    const playwright = await import('playwright');
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const session = new PageSession(page);
    const app = new Application(session);

    const fullUrl = `https://sqqadevs.com/?demoToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaXJzdF9uYW1lIjoiUSIsImxhc3RfbmFtZSI6IkEiLCJlbWFpbCI6InEuYUBzaXRlZ3JvdW5kLmNvbSIsImRvbWFpbiI6IiIsImxhbmciOiJlbiIsImV4cCI6MTk3MDEyNTA3NzJ9.MXA6ZIdl85XojUPStcz3JqyEct0bpKeOk_EEfOh7z7o`;
    await page.goto(fullUrl);

    await use(app);
  }
});

export { expect };
