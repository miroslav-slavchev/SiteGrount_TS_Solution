import { UiElement, SearchContext, By } from '@core';

export abstract class SwitchIconButton extends UiElement {
  constructor(searchContext: SearchContext, by: By) {
    super(searchContext, by);
  }

  async dataIconAttribute(): Promise<string | null> {
    return await this.locator.getAttribute('data-icon');
  }

  protected abstract get positiveIcon(): string;

  async positiveState(): Promise<boolean> {
    return (await this.dataIconAttribute()) === this.positiveIcon;
  }

  protected abstract get negativeIcon(): string;

  async negativeState(): Promise<boolean> {
    return (await this.dataIconAttribute()) === this.negativeIcon;
  }

  async positiveSwitch(): Promise<void> {
    if (await this.negativeState()) {
      await this.locator.click();
    }
  }

  async negativeSwitch(): Promise<void> {
    if (await this.positiveState()) {
      await this.locator.click();
    }
  }
}
