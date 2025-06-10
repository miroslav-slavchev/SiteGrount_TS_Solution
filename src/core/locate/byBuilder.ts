import { By, SearchIn } from './by';
import { Locator } from '@playwright/test';

type LocatorWaitForOptions = Parameters<Locator['waitFor']>[0];
type LocatorLocatorOptions = Parameters<Locator['locator']>[1];

export namespace Locate {
  export function by(
    selector: string,
    options?: LocatorLocatorOptions,
    waitOptions?: LocatorWaitForOptions,
    searchIn: SearchIn = SearchIn.Parent,
    index: number = -1
  ): By {
    return new By(selector, options, waitOptions, searchIn, index);
  }

  export function bySelector(selector: string): ByBuilder {
    return new ByBuilder(selector);
  }
}

export class ByBuilder {
  private selector: string;
  private options?: LocatorLocatorOptions;
  private waitOptions?: LocatorWaitForOptions;
  private searchIn: SearchIn = SearchIn.Parent;
  private index: number = -1;

  constructor(selector: string) {
    this.selector = selector;
  }

  withOptions(options?: LocatorLocatorOptions): this {
    this.options = options;
    return this;
  }

  withWaitOptions(waitOptions?: LocatorWaitForOptions): this {
    this.waitOptions = waitOptions;
    return this;
  }

  withSearchIn(searchIn: SearchIn): this {
    this.searchIn = searchIn;
    return this;
  }

  withIndex(index: number): this {
    this.index = index;
    return this;
  }

  build(): By {
    if (!this.selector) {
      throw new Error('Selector must be provided.');
    }

    return new By(this.selector, this.options, this.waitOptions, this.searchIn, this.index);
  }
}
