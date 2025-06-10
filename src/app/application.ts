import { SearchContext, Locate, By, PageObject, PageSession, } from '@core';
import { Locator } from 'playwright/test';
import { SideNavigation } from './pageObjects/navigation/sideNavigation';
import { DashBoardPage } from './pageObjects/dashBoard/dashBoardPage';
import { EmailPage } from './pageObjects/email/emailPage';
export class Application {
  readonly browserPageSession: PageSession;

  constructor(browserPageSession: PageSession) {
    this.browserPageSession = browserPageSession;
  }

  private get body(): Locator {
    return this.browserPageSession.page.locator('css=body');
  }

  private get bodyContext(): SearchContext {
    return new SearchContext(this.browserPageSession, undefined, this.body);
  }

  get sideNavigation(): SideNavigation {
    return new SideNavigation(this.bodyContext);
  }

  get emailPage(): EmailPage {
    return new EmailPage(this.bodyContext, Locate.by('css=main'));
  }

  get dashBoard(): DashBoardPage {
    return new DashBoardPage(this.bodyContext, Locate.by('css=main'));
  }
}
