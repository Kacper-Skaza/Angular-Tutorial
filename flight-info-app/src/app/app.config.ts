import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

// Rejestracja globalnych usług (providers) dostępnych w całej aplikacji.
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // HttpClient: narzędzie Angulara do zapytań HTTP (GET, POST) do API.
    // Konfiguracja proxy w proxy.conf.json obraca żądania /api-sky na zewnętrzne API (OpenSky).
    provideHttpClient()
  ]
};
