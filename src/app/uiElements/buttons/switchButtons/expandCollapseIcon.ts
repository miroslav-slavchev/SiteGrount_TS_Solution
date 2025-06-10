import { SearchContext,By,Locate } from '@core';
import { SwitchIconButton } from './switchIconButton';

export class ExpandCollapseIcon extends SwitchIconButton {
  constructor(searchContext: SearchContext, by: By = Locate.by("css=span.sg-dropdown__icon")) {
    super(searchContext, by);
  }

  protected get positiveIcon(): string {
    return 'arrow-up';
  }

  protected get negativeIcon(): string {
    return 'arrow-down';
  }

  async expanded(): Promise<boolean> {
    return this.positiveState();
  }

  async collapsed(): Promise<boolean> {
    return this.negativeState();
  }

  async expand(): Promise<void> {
    await this.positiveSwitch();
  }

  async collapse(): Promise<void> {
    await this.negativeSwitch();
  }
}