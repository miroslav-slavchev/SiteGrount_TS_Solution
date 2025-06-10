import { SearchContext, By, PageObject, Locate, UiElement, PageObjectList } from '@core';
import { AccountsPage } from './accounts/accountsPage';
import { ForwardersPage } from './forwarders/forwardersPage';

export class EmailPage extends PageObject {
  constructor(searchContext: SearchContext, specifiedBy: By) {
    super(searchContext, specifiedBy);
  }

  get accounts(): AccountsPage {
    return new AccountsPage(this.searchContext, this.by);
  }

  get forwarders(): ForwardersPage {
    return new ForwardersPage(this.searchContext, this.by);
  }
}
