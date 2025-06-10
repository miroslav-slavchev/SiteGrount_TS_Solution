import { ExpandCollapseIcon } from '@app//uiElements/buttons/switchButtons/expandCollapseIcon';
import { SearchContext, By, UiElement, PageObject,UiElementList, Locate } from '@core';

export class SgDropDown extends PageObject {
  constructor(searchContext: SearchContext, by: By = Locate.by('css=div.sg-dropdown-wrapper')) {
    super(searchContext, by);
  }

  get expandCollapse(): ExpandCollapseIcon {
    return this.uiElementOfType<ExpandCollapseIcon>(ExpandCollapseIcon);
  }

  get current(): UiElement {
    return this.uiElement(Locate.by('css=input'));
  }

  private get options(): UiElementList {
    return this.uiElements(Locate.by('css=div.sg-dropdown__option'));
  }

  async optionsAsync(): Promise<UiElementList> {
    await this.expandCollapse.expand();
    return this.options;
  }

  async optionsTextContentAsync(): Promise<string[]> {
    const optionElements = await this.optionsAsync();
    return await optionElements.selectAsync(option => option.textContent());
  }

  async currentSelectedOptionAsync(): Promise<string> {
    const value = await this.current.getAttribute('placeholder');
    return value!;
  }

  async selectOptionAsync(value: string): Promise<void> {
    await this.expandCollapse.expand();
    await this.options.firstWithText(value).click();
    await this.current.waitForAttributeValue('placeholder', value, 2000);
  }
}
