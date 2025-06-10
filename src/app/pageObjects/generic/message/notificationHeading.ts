import { SearchContext, By, Locate, UiElement, PageObject } from '@core';

export class NotificationHeading extends PageObject {
  constructor(searchContext: SearchContext, by: By = Locate.by('css=h3.sg-box-notification__title')) {
    super(searchContext, by);
  }

  get emphasis(): UiElement {
    return this.uiElement(Locate.by('css=strong em'));
  }
}
