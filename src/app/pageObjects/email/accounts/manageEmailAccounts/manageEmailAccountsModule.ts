import { SearchContext, By, Locate } from '@core';
import { EmailAccountsTable } from './emailAccountsTable';
import { Module } from '@app//pageObjects/generic/module';

export class ManageEmailAccountsModule extends Module {
  constructor(searchContext: SearchContext, by: By) {
    super(searchContext, by);
  }

  get table(): EmailAccountsTable {
    return this.innerPageObjectOfType(EmailAccountsTable, Locate.by('css=table.sg-table'));
  }
}
