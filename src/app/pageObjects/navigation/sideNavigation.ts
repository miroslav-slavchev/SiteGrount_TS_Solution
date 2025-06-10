import { SearchContext, By, PageObject, Locate, UiElement, PageObjectList } from '@core';
import { SideNavigationGroupExpandable } from './sideNavigationGroupExpandable';
import { EmailNavigationList } from './emailNavigationList';


export class SideNavigation extends PageObject {
  constructor(searchContext: SearchContext) {
    super(searchContext, Locate.by('css=aside nav'));
  }

  get dashBoard(): UiElement {
    return this.uiElement(Locate.by('css=li.navigation-group-dashboard'));
  }

  get pages(): PageObjectList<SideNavigationGroupExpandable> {
    return this.innerPageObjects(SideNavigationGroupExpandable); // assumes default `By` for list
  }

  async navigateAsync(pageName: string, subPageName: string): Promise<void> {
    const page = await this.pages.firstOrDefaultWhereAsync(async (page) =>
      (await page.title.textContent()) === pageName
    );

    if (!page) {
      throw new Error(`Page '${pageName}' not found in the side navigation.`);
    }

    await page.title.click();

    const subPage = await page.subPages.firstOrDefaultWhereAsync(async (sub) =>
      (await sub.textContent()) === subPageName
    );

    if (!subPage) {
      throw new Error(`SubPage '${subPageName}' not found under '${pageName}'.`);
    }

    await subPage.click();
  }

  get email(): EmailNavigationList {
    return new EmailNavigationList(this);
  }
}
