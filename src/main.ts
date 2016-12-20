import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';
import { AppSettings } from './app/app.settings'

if (AppSettings.environment === 'production') {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);