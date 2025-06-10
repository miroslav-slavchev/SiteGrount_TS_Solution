import { By } from '../locate/by';
import { SearchContext } from './searchContext';
import { UiContext } from './uiContext';

export class UiContextList<TUiContext extends UiContext> extends UiContext implements AsyncIterable<TUiContext> {
  private cachedList?: TUiContext[];
  private readonly ctor: new (searchContext: SearchContext, by: By) => TUiContext;
  private readonly precondition?: () => Promise<boolean>;
  private readonly skipDefaultWait: boolean;

  constructor(
    searchContext: SearchContext,
    by: By,
    ctor: new (searchContext: SearchContext, by: By) => TUiContext,
    precondition?: () => Promise<boolean>,
    skipDefaultWait: boolean = false
  ) {
    super(searchContext, by);
    this.ctor = ctor;
    this.precondition = precondition;
    this.skipDefaultWait = skipDefaultWait;
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<TUiContext> {
    await this.ensureElementsVisible();

    const count = await this.locator.count();

    for (let i = 0; i < count; i++) {
      const nthBy = new By(
        this.by.selector,
        this.by.options,
        this.by.waitOptions,
        this.by.searchIn,
        i
      );
      yield UiContext.construct<TUiContext>(this.ctor, this.searchContext, nthBy);
    }
  }

  private async ensureElementsVisible(): Promise<void> {
    if (this.precondition) {
      const result = await this.precondition();
      if (!result) throw new Error('Precondition failed.');
      return;
    }

    if (this.skipDefaultWait) return;

    const waitOptions = {
      state: 'visible' as const,
      strict: false,
      timeout: 4000,
    };
    await this.page.waitForSelector(this.by.selector, waitOptions);
  }

  async toList(useCache = false): Promise<TUiContext[]> {
    if (useCache && this.cachedList) return this.cachedList;
    const result: TUiContext[] = [];
    for await (const item of this) result.push(item);
    if (useCache) this.cachedList = result;
    return result;
  }

  clearCache(): void {
    this.cachedList = undefined;
  }

  async first(): Promise<TUiContext> {
    const list = await this.toList();
    if (list.length === 0) throw new Error('No elements found');
    return list[0];
  }

  async firstOrDefault(): Promise<TUiContext | undefined> {
    const list = await this.toList();
    return list[0];
  }

  async firstOrDefaultWhere(predicate: (item: TUiContext) => boolean): Promise<TUiContext | undefined> {
    const list = await this.toList();
    return list.find(predicate);
  }

  async firstOrDefaultWhereAsync(predicate: (item: TUiContext) => Promise<boolean>): Promise<TUiContext | undefined> {
    for await (const item of this) {
      if (await predicate(item)) return item;
    }
    return undefined;
  }

  async containsAsync(predicate: (item: TUiContext) => Promise<boolean>): Promise<boolean> {
    return (await this.firstOrDefaultWhereAsync(predicate)) !== undefined;
  }

  async selectAsync<TResult>(selector: (item: TUiContext) => Promise<TResult>): Promise<TResult[]> {
    const results: TResult[] = [];
    for await (const item of this) results.push(await selector(item));
    return results;
  }

  async whereAsync(predicate: (item: TUiContext) => Promise<boolean>): Promise<TUiContext[]> {
    const results: TUiContext[] = [];
    for await (const item of this) {
      if (await predicate(item)) results.push(item);
    }
    return results;
  }

  async forEachAsync(action: (item: TUiContext) => Promise<void>): Promise<void> {
    for await (const item of this) await action(item);
  }

  async singleOrDefaultAsync(predicate: (item: TUiContext) => Promise<boolean>): Promise<TUiContext | undefined> {
    let match: TUiContext | undefined;
    for await (const item of this) {
      if (await predicate(item)) {
        if (match) throw new Error('Multiple elements match the condition.');
        match = item;
      }
    }
    return match;
  }

  async groupByAsync<TKey>(keySelector: (item: TUiContext) => Promise<TKey>): Promise<Map<TKey, TUiContext[]>> {
    const map = new Map<TKey, TUiContext[]>();
    for await (const item of this) {
      const key = await keySelector(item);
      const group = map.get(key) || [];
      group.push(item);
      map.set(key, group);
    }
    return map;
  }

  firstWithText(text: string): TUiContext {
    const options = this.by.options ? { ...this.by.options, hasText: text } : { hasText: text };
    const by = new By(this.by.selector, options, this.by.waitOptions, this.by.searchIn);
    return UiContext.construct<TUiContext>(this.ctor, this.searchContext, by);
  }

  async last(): Promise<TUiContext> {
    const list = await this.toList();
    if (list.length === 0) throw new Error('No elements found');
    return list[list.length - 1];
  }

  async nth(index: number): Promise<TUiContext> {
    const list = await this.toList();
    if (index < 0 || index >= list.length) throw new Error(`Index ${index} is out of range.`);
    return list[index];
  }

  async count(): Promise<number> {
    return this.locator.count();
  }
}
