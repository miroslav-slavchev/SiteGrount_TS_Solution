import { UiElement, SearchContext, By, Locate } from '@core';

export class LoadSpinner extends UiElement {
  constructor(searchContext: SearchContext, by: By = Locate.by('css=div.sg-loader__spinner')) {
    super(searchContext, by);
  }
}