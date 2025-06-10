import { SearchContext, By, PageObject, Locate, UiElement, PageObjectList } from '@core';
import { SideNavigation } from './sideNavigation';

export class EmailNavigationList {
  readonly navigation: SideNavigation;

  constructor(navigation: SideNavigation) {
    this.navigation = navigation;
  }

  async accountsAsync(): Promise<void> {
    await this.navigation.navigateAsync('Email', 'Accounts');
  }

  async forwardersAsync(): Promise<void> {
    await this.navigation.navigateAsync('Email', 'Forwarders');
  }

  async autorespondersAsync(): Promise<void> {
    await this.navigation.navigateAsync('Email', 'Autoresponders');
  }

  async filtersAsync(): Promise<void> {
    await this.navigation.navigateAsync('Email', 'Filters');
  }

  async authenticationAsync(): Promise<void> {
    await this.navigation.navigateAsync('Email', 'Authentication');
  }

  async spamProtectionAsync(): Promise<void> {
    await this.navigation.navigateAsync('Email', 'Spam Protection');
  }

  async emailMigratorAsync(): Promise<void> {
    await this.navigation.navigateAsync('Email', 'Email Migrator');
  }
}
