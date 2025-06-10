import { SearchContext, By, PageObject, Locate, UiElement, PageObjectList } from '@core';
import { SelectDomainModule } from '../accounts/selectDomainModule';
import { CreateNewRuleModule } from './createNewRuleModule';

export class ForwardersPage extends PageObject {
  constructor(searchContext: SearchContext, by: By) {
    super(searchContext, by);
  }

  get selectDomain(): SelectDomainModule {
    return this.innerPageObjectOfType<SelectDomainModule>(SelectDomainModule, Locate.by('css=div.domain-select'));
  }

  get createNewRule(): CreateNewRuleModule {
    return this.innerPageObjectOfType<CreateNewRuleModule>(CreateNewRuleModule, Locate.by('css=section'));
  }
}
