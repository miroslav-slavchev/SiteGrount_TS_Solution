import { UiElement, SearchContext, By } from '@core';

export class SgIcon extends UiElement {
  constructor(searchContext: SearchContext, by: By) {
    super(searchContext, by);
  }

  async dataIcon(): Promise<string | null> {
    return await this.locator.getAttribute('data-icon');
  }

  async isSuccess(): Promise<boolean> {
    return (await this.dataIcon()) === 'success';
  }

  async isErrorAttention(): Promise<boolean> {
    return (await this.dataIcon()) === 'error-attention';
  }
}