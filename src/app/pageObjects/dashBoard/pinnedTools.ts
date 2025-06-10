import { UiElement, SearchContext, Locate, UiElementList, PageObject, By } from '@core';


export class PinnedTools extends PageObject {
  constructor(searchContext: SearchContext) {
    super(searchContext, Locate.by('css=div > div > div > div > div:nth-child(2)'));
  }

  get items(): UiElementList {
    return this.uiElements(Locate.by('css=div.dashboard-tile--clickable'));
  }

  get(emailName: string): UiElement {
    return this.items.firstWithText(emailName);
  }

  get emailAccounts(): UiElement {
    return this.get('Email Accounts');
  }
}