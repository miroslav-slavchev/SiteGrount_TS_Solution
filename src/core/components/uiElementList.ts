import { UiElement } from './uiElement';
import { UiContextList } from '../context/uiContextList';
import { SearchContext } from '../context/searchContext';
import { By } from '../locate/by';

export class UiElementListOfType<TUiElement extends UiElement> extends UiContextList<TUiElement> {
  constructor(
    searchContext: SearchContext,
    by: By,
    ctor: new (searchContext: SearchContext, by: By) => TUiElement,
    precondition?: () => Promise<boolean>,
    skipDefaultWait: boolean = false
  ) {
    super(searchContext, by, ctor, precondition, skipDefaultWait);
  }
}

export class UiElementList extends UiElementListOfType<UiElement> {
  constructor(
    searchContext: SearchContext,
    by: By,
    ctor: new (searchContext: SearchContext, by: By) => UiElement,
    precondition?: () => Promise<boolean>,
    skipDefaultWait: boolean = false
  ) {
    super(searchContext, by, ctor, precondition, skipDefaultWait);
  }
}
