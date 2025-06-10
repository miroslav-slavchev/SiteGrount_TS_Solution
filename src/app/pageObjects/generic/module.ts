import { SearchContext, By, UiElement, PageObject,  Locate } from '@core';

export abstract class Module extends PageObject {
  constructor(searchContext: SearchContext, by: By) {
    super(searchContext, by);
  }

  get heading(): UiElement {
    return this.uiElement(Locate.by('css=h2'));
  }
}
