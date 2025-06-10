import { Locator } from '@playwright/test';
import { PageSession } from '../pageSession';

/**
 * Represents a search context for locating elements within a browser session.
 */
export class SearchContext {
  readonly browserSession: PageSession;
  readonly parentLocator?: Locator;
  readonly rootLocator?: Locator;

  constructor(browserSession: PageSession, parentLocator?: Locator, rootLocator?: Locator) {
    this.browserSession = browserSession;
    this.parentLocator = parentLocator;
    this.rootLocator = rootLocator;
  }

  getChildSearchContext(targetLocator: Locator): SearchContext {
    return new SearchContext(this.browserSession, targetLocator, this.rootLocator);
  }
}
