import { UiElement, SearchContext, By, Locate } from '@core';

export class Button extends UiElement {
  constructor(searchContext: SearchContext, by: By = Locate.by('css=button')) {
    super(searchContext, by);
  }
}
