import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import $ from 'jquery';

(window as any).$ = $;
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
