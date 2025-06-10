import { UiElement, SearchContext, By, Locate } from '@core';

export class TextInput extends UiElement {
  constructor(searchContext: SearchContext, by?: By) {
    super(searchContext, by ?? Locate.by('css=input[data-e2e=text-input-name]'));
  }
}