import { Button } from '@app//uiElements/buttons/button';
import { SearchContext, By, PageObject, Locate, UiElement, PageObjectList } from '@core';
import { TextInputField } from '../../generic/input/textInputField';
import { Module } from '../../generic/module';


export class CreateNewRuleModule extends Module {
  constructor(searchContext: SearchContext, by: By) {
    super(searchContext, by);
  }

  get create(): Button {
    return this.uiElementOfType<Button>(Button, Locate.by('css=button.sg-button--primary'));
  }

  get forwardAllMessagesSentTo(): TextInputField {
    return this.innerPageObjectOfType<TextInputField>(TextInputField, Locate.by('css=label[data-e2e=forward-crate-name-label]'));
  }
}
