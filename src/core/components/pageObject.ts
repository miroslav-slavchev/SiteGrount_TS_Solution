import { By } from '../locate/by';
import { SearchContext } from '../context/searchContext';
import { UiElement } from './uiElement';
import { UiElementListOfType } from './uiElementList';
import { UiElementList } from './uiElementList';
import { PageObjectList } from './pageObjectList';
import { UiContext } from '../context/uiContext';

// Helper type for constructor with (SearchContext, By)
type PageObjectCtor<T> = new (searchContext: SearchContext, by: By) => T;

export abstract class PageObject extends UiContext {
  constructor(searchContext: SearchContext, by: By) {
    super(searchContext, by);
  }

  protected innerPageObjectOfType<TPageObject extends PageObject>(
    ctor: PageObjectCtor<TPageObject>,
    by?: By
  ): TPageObject {
    const childContext = this.searchContext.getChildSearchContext(this.locator);
    return UiContext.construct(ctor, childContext, by);
  }

  protected innerPageObjects<TPageObject extends PageObject>(
    ctor: PageObjectCtor<TPageObject>,
    by?: By,
    precondition?: () => Promise<boolean>,
    skipDefaultWait: boolean = false
  ): PageObjectList<TPageObject> {
    const childContext = this.searchContext.getChildSearchContext(this.locator);

    if (!by) {
      const temp = UiContext.construct(ctor, childContext);
      by = temp.by;
    }

    return new PageObjectList<TPageObject>(childContext, by, ctor, precondition, skipDefaultWait);
  }

  protected uiElement(by?: By): UiElement {
    return this.uiElementOfType(UiElement, by);
  }

  protected uiElementOfType<TUiElement extends UiElement>(
    ctor: new (searchContext: SearchContext, by: By) => TUiElement,
    by?: By
  ): TUiElement {
    const childContext = this.searchContext.getChildSearchContext(this.locator);
    return UiContext.construct(ctor, childContext, by);
  }

  protected uiElements(by?: By,  precondition?: () => Promise<boolean>, skipDefaultWait: boolean = false): UiElementList {
    return new UiElementList(this.searchContext.getChildSearchContext(this.locator), by!, UiElement, precondition, skipDefaultWait);
  }

  protected uiElementsOfType<TUiElement extends UiElement>(
    ctor: new (searchContext: SearchContext, by: By) => TUiElement,
    by?: By,
    precondition?: () => Promise<boolean>,
    skipDefaultWait: boolean = false
  ): UiElementListOfType<TUiElement> {
    const childContext = this.searchContext.getChildSearchContext(this.locator);

    if (!by) {
      const temp = UiContext.construct(ctor, childContext);
      by = temp.by;
    }

    return new UiElementListOfType<TUiElement>(childContext, by, ctor, precondition, skipDefaultWait);
  }
}
