import { EmailAccountTableRow } from './emailAccountTableRow';
import { SearchContext, By, UiElementList, PageObject, PageObjectList, Locate } from '@core';

export class EmailAccountsTable extends PageObject {
  constructor(searchContext: SearchContext, by: By) {
    super(searchContext, by);
  }

  get columns(): UiElementList {
    return this.uiElements(Locate.by('css=thead th'));
  }

  get rows(): PageObjectList<EmailAccountTableRow> {
    return this.innerPageObjects<EmailAccountTableRow>(EmailAccountTableRow, Locate.by('css=tr.sg-table__row') );
  }
}