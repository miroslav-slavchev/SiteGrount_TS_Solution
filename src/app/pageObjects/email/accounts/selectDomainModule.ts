import { SearchContext, By, Locate } from '@core';
import { Module } from '../../generic/module';
import { SgDropDown } from '../../generic/select/sgDropDown';

export class SelectDomainModule extends Module {
  constructor(searchContext: SearchContext, by: By) {
    super(searchContext, by);
  }

  get dropDown(): SgDropDown {
    return this.innerPageObjectOfType(SgDropDown, Locate.by('css=div.sg-dropdown-wrapper'));
  }
}
