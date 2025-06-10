import { Locator } from '@playwright/test';

type LocatorWaitForOptions = Parameters<Locator['waitFor']>[0];
type LocatorLocatorOptions = Parameters<Locator['locator']>[1];

// Equivalent to: public enum SearchIn
export enum SearchIn {
  Parent = 'Parent',
  Root = 'Root',
  Page = 'Page',
}

// Equivalent to: public class By
export class By {
  readonly selector: string;
  readonly options?: LocatorLocatorOptions;
  readonly waitOptions?: LocatorWaitForOptions;
  readonly searchIn: SearchIn;
  index: number;

  constructor(
    selector: string,
    options?: LocatorLocatorOptions,
    waitOptions?: LocatorWaitForOptions,
    searchIn: SearchIn = SearchIn.Parent,
    index: number = -1
  ) {
    this.selector = selector;
    this.options = options;
    this.waitOptions = waitOptions;
    this.searchIn = searchIn;
    this.index = index;
  }
}
