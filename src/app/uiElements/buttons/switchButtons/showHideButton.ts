import { SearchContext,By,Locate } from '@core';
import { SwitchIconButton } from './switchIconButton';

export class ShowHideButton extends SwitchIconButton {
  constructor(searchContext: SearchContext, by: By = Locate.by("css=span.sg-icon[data-icon=eye],span.sg-icon[data-icon=eye-cross]")) {
    super(searchContext, by);
  }

  protected get positiveIcon(): string {
    return 'eye';
  }

  protected get negativeIcon(): string {
    return 'eye-cross';
  }

  async shown(): Promise<boolean> {
    return this.positiveState();
  }

  async hidden(): Promise<boolean> {
    return this.negativeState();
  }

  async show(): Promise<void> {
    await this.positiveSwitch();
  }

  async hide(): Promise<void> {
    await this.negativeSwitch();
  }
}
