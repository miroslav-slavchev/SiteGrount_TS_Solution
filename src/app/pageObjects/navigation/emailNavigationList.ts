import { SideNavigation } from './sideNavigation';

export class EmailNavigationList {
  readonly navigation: SideNavigation;

  constructor(navigation: SideNavigation) {
    this.navigation = navigation;
  }

  async clickAccountsAsync(): Promise<void> {
    await this.navigation.navigateAsync('Email', 'Accounts');
  }

  async clickForwardersAsync(): Promise<void> {
    await this.navigation.navigateAsync('Email', 'Forwarders');
  }

  async clickAutorespondersAsync(): Promise<void> {
    await this.navigation.navigateAsync('Email', 'Autoresponders');
  }

  async clickFiltersAsync(): Promise<void> {
    await this.navigation.navigateAsync('Email', 'Filters');
  }

  async clickAuthenticationAsync(): Promise<void> {
    await this.navigation.navigateAsync('Email', 'Authentication');
  }

  async clickSpamProtectionAsync(): Promise<void> {
    await this.navigation.navigateAsync('Email', 'Spam Protection');
  }

  async clickEmailMigratorAsync(): Promise<void> {
    await this.navigation.navigateAsync('Email', 'Email Migrator');
  }
}
