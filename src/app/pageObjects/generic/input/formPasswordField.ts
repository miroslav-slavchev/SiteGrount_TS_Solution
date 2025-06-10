import { Button } from '@app//uiElements/buttons/button';
import { ShowHideButton } from '@app//uiElements/buttons/switchButtons/showHideButton';
import { TextInput } from '@app//uiElements/inputs/textInput ';
import { SearchContext, By, Locate, PageObject } from '@core';

export class FormPasswordField extends PageObject {
  constructor(searchContext: SearchContext, by: By) {
    super(searchContext, by);
  }

  get input(): TextInput {
    return this.uiElementOfType<TextInput>(TextInput, Locate.by('css=input[data-e2e=form-password-password]'));
  }

  get showOrHideButton(): ShowHideButton {
    return this.uiElementOfType<ShowHideButton>(ShowHideButton);
  }

  get generateButton(): Button {
    return this.uiElementOfType<Button>(Button, Locate.by('css=button[data-e2e=password-generate]'));
  }

  get copyButton(): Button {
    return this.uiElementOfType<Button>(Button, Locate.bySelector('css=button').withOptions({ hasText: 'Copy' }).build());
  }

  get reGenerateButton(): Button {
    return this.uiElementOfType<Button>(Button, Locate.by('css=span[data-icon=refresh]'));
  }
}
