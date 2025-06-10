import { SearchContext, By, PageObject, Locate, UiElement, UiElementList } from '@core';

export class SideNavigationGroupExpandable extends PageObject {
  constructor(searchContext: SearchContext, by: By = Locate.by('css=li.sg-navigation-list')) {
    super(searchContext, by);
  }

  get title(): UiElement {
    return this.uiElement(Locate.by('css=span.sg-navigation-list__title'));
  }

  get subPages(): UiElementList{
    return this.uiElements(Locate.by('css=li.sg-navigation-list__item'));
  }

  async activeSubPage(): Promise<UiElement> {
    const active = await this.subPages.firstOrDefaultWhereAsync(async (subPage) => {
      const classAttr = await subPage.getAttribute('class');
      return classAttr?.includes('sg-navigation-list__item--active') ?? false;
    });

    if (!active) {
      throw new Error('No active page');
    }

    return active;
  }
}
