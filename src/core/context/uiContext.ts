import { Locator, Page } from '@playwright/test';
import { By } from '../locate/by';
import { SearchContext } from './searchContext';
import { SearchIn } from '../locate/by';

type LocatorLocatorOptions = Parameters<Locator['locator']>[1];
type PageLocatorOptions = Parameters<Locator['locator']>[1];

export abstract class UiContext {
  readonly name: string;
  readonly searchContext: SearchContext;
  public by: By;

  constructor(searchContext: SearchContext, by: By) {
    this.name = this.constructor.name;
    this.searchContext = searchContext;
    this.by = by;
  }

  get locator(): Locator {
    return this.getLocator();
  }

  get page(): Page {
    return this.searchContext.browserSession.page;
  }

  static construct<T extends UiContext>(
    ctor: (new (searchContext: SearchContext, by: By) => T) | (new (searchContext: SearchContext) => T),
    searchContext: SearchContext,
    by?: By
  ): T {
    try {
      if (by) {
        return new (ctor as new (searchContext: SearchContext, by: By) => T)(searchContext, by);
      } else {
        return new (ctor as new (searchContext: SearchContext) => T)(searchContext);
      }
    } catch (err) {
      throw new Error(
        `${ctor} must define a public constructor with either (SearchContext, By) or (SearchContext).`
      );
    }
  }

  private getLocator(): Locator {
    let locator: Locator;

    if (this.by.searchIn === SearchIn.Parent && this.searchContext.parentLocator) {
      locator = this.searchContext.parentLocator.locator(this.by.selector, this.by.options);
    } else if (this.by.searchIn === SearchIn.Root && this.searchContext.rootLocator) {
      locator = this.searchContext.rootLocator.locator(this.by.selector, this.by.options);
    } else if (this.by.searchIn === SearchIn.Page) {
      locator = this.page.locator(this.by.selector, this.convertToPageOptions(this.by.options));
    } else {
      locator = this.getLocatorByPriority();
    }

    if (this.by.waitOptions) {
      // Fire and forget just like C# async method without await
      locator.waitFor(this.by.waitOptions).catch(() => {});
    }

    return this.by.index >= 0 ? locator.nth(this.by.index) : locator;
  }

  private getLocatorByPriority(): Locator {
    if (this.searchContext.parentLocator) {
      return this.searchContext.parentLocator.locator(this.by.selector, this.by.options);
    } else if (this.searchContext.rootLocator) {
      return this.searchContext.rootLocator.locator(this.by.selector, this.by.options);
    } else {
      return this.page.locator(this.by.selector, this.convertToPageOptions(this.by.options));
    }
  }

 private  convertToLocatorOptions(pageOptions?: PageLocatorOptions): LocatorLocatorOptions | undefined {
  if (!pageOptions) return undefined;

  return {
    has: pageOptions.has,
    hasNot: pageOptions.hasNot,
    hasText: pageOptions.hasText,
    hasNotText: pageOptions.hasNotText
  };
}

private convertToPageOptions(locatorOptions?: LocatorLocatorOptions): PageLocatorOptions | undefined {
  if (!locatorOptions) return undefined;

  return {
    has: locatorOptions.has,
    hasNot: locatorOptions.hasNot,
    hasText: locatorOptions.hasText,
    hasNotText: locatorOptions.hasNotText
  };
}
}
