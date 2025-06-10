import { Browser, BrowserContext, Page } from '@playwright/test';

export class PageSession {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get context(): BrowserContext {
    return this.page.context();
  }

  get browser(): Browser {
    return this.context.browser()!;
  }
}
