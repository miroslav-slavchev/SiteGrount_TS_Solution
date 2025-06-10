import { TextInput } from '@app//uiElements/inputs/textInput ';
import { SearchContext, By, Locate, UiElement, PageObject } from '@core';
import { ValidationError } from '../message/validationError';

export class TextInputField extends PageObject {
  constructor(searchContext: SearchContext, by: By) {
    super(searchContext, by);
  }

  get input(): TextInput {
    return this.uiElementOfType<TextInput>(TextInput);
  }

  get addOn(): UiElement {
    return this.uiElementOfType(TextInput, Locate.by('css=span.sg-input-text-truncate'));
  }

  get validationError(): ValidationError {
    return this.innerPageObjectOfType<ValidationError>(ValidationError, Locate.by('css=div.sg-validation--error'));
  }
}
