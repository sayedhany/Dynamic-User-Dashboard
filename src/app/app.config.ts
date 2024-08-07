import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UsersService } from './services/users.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { LoadingService } from './components/loading/loading.service';

export const appConfig: ApplicationConfig = {
  providers: [
    UsersService,
    LoadingService,
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
  ],
};
