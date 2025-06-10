import { SearchContext, By, Locate, PageObject } from '@core';
import { SelectDomainModule } from './selectDomainModule';
import { CreateNewEmailAccountModule } from './createNewEmailAccountModule';
import { ManageEmailAccountsModule } from './manageEmailAccounts/manageEmailAccountsModule';

export class AccountsPage extends PageObject {
  constructor(searchContext: SearchContext, by: By = Locate.by('css=main')) {
    super(searchContext, by);
  }

  get selectDomain(): SelectDomainModule {
    return this.innerPageObjectOfType(SelectDomainModule, Locate.by('css=div.domain-select'));
  }

  get createNewEmailAccount(): CreateNewEmailAccountModule {
    return this.innerPageObjectOfType(CreateNewEmailAccountModule, Locate.by('css=section'));
  }

  get manageEmailAccounts(): ManageEmailAccountsModule {
    return this.innerPageObjectOfType(ManageEmailAccountsModule, Locate.by('css=div:nth-child(2) > div > div > div:nth-child(3)'));
  }
}
