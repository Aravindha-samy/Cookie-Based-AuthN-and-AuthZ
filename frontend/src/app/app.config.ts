import { ApplicationConfig, NgModule, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './Helpers/authInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors(
    [
      authInterceptor
    ]
    )),

    NgModule,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
