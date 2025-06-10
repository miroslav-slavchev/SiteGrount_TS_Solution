import { SearchContext, By, Locate, PageObject } from '@core';
import { NotificationHeading } from './notificationHeading';
import { Button } from '@app//uiElements/buttons/button';
import { SgIcon } from '@app//uiElements/icons/sgIcon';

export class Notification extends PageObject {
  constructor(searchContext: SearchContext, by: By = Locate.by('css=div.sg-box-notification')) {
    super(searchContext, by);
  }

  get heading(): NotificationHeading {
    return this.innerPageObjectOfType(NotificationHeading, Locate.by('css=h3.sg-box-notification__title'));
  }

  get back(): Button {
    return this.uiElementOfType<Button>(Button, Locate.by('css=button.sg-box-notification__back-button'));
  }

  get icon(): SgIcon {
    return this.uiElementOfType<SgIcon>(SgIcon, Locate.by('css=span.sg-box-notification__icon'));
  }

  async presentAsync(): Promise<Notification | null> {
    try {
      await this.locator.waitFor({
        state: 'attached',
        timeout: 3000
      });
      return this;
    } catch {
      return null;
    }
  }
}
