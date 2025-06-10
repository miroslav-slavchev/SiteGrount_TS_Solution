import { SgIcon } from '@app//uiElements/icons/sgIcon';
import { SearchContext, By, Locate, PageObject, UiElement } from '@core';


export class ValidationError extends PageObject {
  constructor(searchContext: SearchContext, by: By) {
    super(searchContext, by);
  }

  get icon(): SgIcon {
    return this.uiElementOfType<SgIcon>(SgIcon, Locate.by('css=span:nth-child(1)'));
  }

  get message(): UiElement {
    return this.uiElementOfType(SgIcon, Locate.by('css=span:nth-child(2)'));
  }

  async presentAsync(): Promise<ValidationError | null> {
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
