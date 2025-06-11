import { test as base, expect } from '@playwright/test';
import { Application } from '../src/app/application';
import { PageSession } from '@core';
import { Config } from 'appconfig';

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

    const url = Config.app.url;
    const token = Config.user.token;
    const fullUrl = `${url}?demoToken=${token}`;
    await page.goto(fullUrl);

    await use(app);
  }
});

export { expect };
