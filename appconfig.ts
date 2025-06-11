// config.ts
import rawConfig from './appconfig.json';

export class AppSettings {
  url: string;

  constructor(data: any) {
    this.url = data.url;
  }
}

export class UserSettings {
  token: string;

  constructor(data: any) {
    this.token = data.token;
  }
}

export class AppConfig {
  app: AppSettings;
  user: UserSettings;

  constructor(data: any) {
    if (!data.app?.url) throw new Error('Missing app.url in config');
    if (!data.user?.token) throw new Error('Missing user.token in config');

    this.app = new AppSettings(data.app);
    this.user = new UserSettings(data.user);
  }
}

// Exported singleton instance
export const Config = new AppConfig(rawConfig);
