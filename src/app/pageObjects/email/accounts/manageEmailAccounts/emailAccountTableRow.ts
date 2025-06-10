import { SearchContext, By, UiElement, PageObject, Locate } from '@core';

export class EmailAccountTableRow extends PageObject {
  constructor(searchContext: SearchContext, by: By) {
    super(searchContext, by);
  }

  get accountName(): UiElement {
    return this.uiElement(Locate.by('css=td:nth-child(1)'));
  }

  get currentUsageAndQuota(): UiElement {
    return this.uiElement(Locate.by('css=td:nth-child(2)'));
  }

  get expandActionsMenu(): UiElement {
    return this.uiElement(Locate.by('css=td:nth-child(3)'));
  }
}
