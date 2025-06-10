import { SearchContext, By, PageObject } from '@core';
import { PinnedTools } from './pinnedTools';

export class DashBoardPage extends PageObject {
  constructor(searchContext: SearchContext, by: By) {
    super(searchContext, by);
  }

  get pinnedTools(): PinnedTools {
    return this.innerPageObjectOfType(PinnedTools);
  }
}