import { PageObject } from './pageObject';
import { UiContextList } from '../context/uiContextList';
import { SearchContext } from '../context/searchContext';
import { By } from '../locate/by';

export class PageObjectList<TPageObject extends PageObject> extends UiContextList<TPageObject> {
  constructor(
    searchContext: SearchContext,
    by: By,
    ctor: new (searchContext: SearchContext, by: By) => TPageObject,
    precondition?: () => Promise<boolean>,
    skipDefaultWait: boolean = false
  ) {
    super(searchContext, by, ctor, precondition, skipDefaultWait);
  }
}

export class PageObjectListBase extends PageObjectList<PageObject> {
  constructor(
    searchContext: SearchContext,
     by: By,
     ctor: new (searchContext: SearchContext, by: By) => PageObject
    ) {
    super(searchContext, by, ctor);
  }
}
