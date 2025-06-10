import { SearchContext, By, Locate } from '@core';
import { Module } from '../../generic/module';
import { Notification } from '../../generic/message/notification';
import { Button } from '@app//uiElements/buttons/button';
import { LoadSpinner } from '@app//uiElements/icons/loadSpinner';
import { TextInputField } from '../../generic/input/textInputField';
import { FormPasswordField } from '../../generic/input/formPasswordField';

export class CreateNewEmailAccountModule extends Module {
  constructor(searchContext: SearchContext, by: By) {
    super(searchContext, by);
  }

  get accountName(): TextInputField {
    return this.innerPageObjectOfType(TextInputField, Locate.by('css=label[data-e2e=text-input-name-label]'));
  }

  get password(): FormPasswordField {
    return this.innerPageObjectOfType(FormPasswordField, Locate.by('css=label[data-e2e=form-password-password-label]'));
  }

  get create(): Button {
    return this.uiElementOfType<Button>(Button, Locate.by('css=button[data-e2e=create-box-submit]'));
  }

  get loadSpinner(): LoadSpinner {
    return this.uiElementOfType<LoadSpinner>(LoadSpinner);
  }

  async createAsync(): Promise<void> {
    await this.create.click();
    await this.loadSpinner.locator.waitFor({
      state: 'hidden',
      timeout: 5000
    });
  }

  get notification(): Notification {
    return this.innerPageObjectOfType<Notification>(Notification, Locate.by('css=div.sg-box-notification'));
  }
}
