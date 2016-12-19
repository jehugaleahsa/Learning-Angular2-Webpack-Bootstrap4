import 'core-js/client/shim.min.js';
import 'reflect-metadata/Reflect.js';
import 'zone.js/dist/zone.js';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);