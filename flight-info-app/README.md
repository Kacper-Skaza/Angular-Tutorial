# Flight-Info App

Prosta aplikacja pozwalająca na wyszukiwanie informacji o samolotach w powietrzu w czasie rzeczywistym. Dane pobierane są z publicznego API OpenSky Network za pośrednictwem proxy serwera.

### Wymagania

Instrukcja instalacji wymaganych narzędzi znajduje się w prezentacji na slajdach 11 i 12:
- **Node.js** - środowisko uruchomieniowe JavaScript
- **npm** - menedżer pakietów Node.js (instalowany wraz z Node.js)
- **Angular CLI** - narzędzie linii poleceń do zarządzania projektami Angular

### Uruchamianie

```bash
npm install
ng serve --open
```
- Aplikacja będzie dostępna pod adresem `http://localhost:4200/`
- Komendę `npm install` należy wykonać tylko przy pierwszym uruchomieniu aplikacji, aby zainstalować niezbędne zależności

## Zadanie 2: Walidacja numeru lotu

Rozszerz `FlightService` o walidację numeru lotu przed wysłaniem żądania do API:
- Sprawdź, czy numer lotu nie jest pusty ani `null`
- Sprawdź, czy numer lotu zawiera wyłącznie litery i cyfry (bez spacji i znaków specjalnych)
- Sprawdź, czy długość numeru lotu nie przekracza 8 znaków
- W przypadku błędu zwróć odpowiedni komunikat i nie wysyłaj żądania HTTP

## Struktura plików

### 1. `src/app/app.config.ts` - Konfiguracja aplikacji

Plik definiuje globalnych dostawców usług (providers), które są dostępne w całej aplikacji. Kluczowa linia to `provideHttpClient()` - rejestruje narzędzie do komunikacji HTTP z API.

**Koncepcja**: W Angularze provider to globalny serwis, który jest automatycznie wstrzykiwany do komponentów (Dependency Injection).

### 2. `src/app/app.ts` - Główny komponent

Stanowi interfejs użytkownika. Zawiera:
- **Właściwości**: `nr` (numer lotu), `lot` (dane z API), `error` (komunikat błędu)
- **Dependency Injection**: konstruktor otrzymuje instancję `FlightService` od Angulara
- **Metoda `szukaj()`**: asynchroniczna metoda obsługująca kliknięcie przycisku

**Koncepcja**: Komponenty to klasy TypeScript dekorowane `@Component`, które zarządzają stanem i logika aplikacji. Dekorator `@Component` łączy komponent z templatem HTML (`app.html`) i stylami (`app.css`).

### 3. `src/app/app.html` - Szablon UI

Definiuje interfejs użytkownika z wykorzystaniem Angular directives:
- `[(ngModel)]` — dwukierunkowe wiązanie (zmiany w polu inputu synchronizują się ze zmienną komponentu)
- `(click)` — event binding (kliknięcie wywołuje metodę)
- `*ngIf` — warunkowe wyświetlanie (element pojawia się w DOM tylko gdy warunek jest spełniony)
- `{{ }}` — interpolacja (wyświetlanie wartości zmiennych)
- `| number` — pipe do formatowania liczb (konwersja jednostek z API)

**Koncepcja**: Template automatycznie reaguje na zmiany stanu komponentu. Gdy użytkownik wpisze numer lotu i kliknie przycisk, Angular wywoła `szukaj()`, a następnie zaktualizuje widok danymi z API.

### 4. `src/app/services/flight.service.ts` - Serwis API

Warstwa abstrakcji komunikacji z API. Serwis:
- Dekorator `@Injectable({ providedIn: 'root' })` — Angular zarządza jedną instancją w całej aplikacji (singleton)
- Właściwość `url` — endpoint API OpenSky (przeformatowany przez proxy)
- Metoda `getFlight(nr)` — wysyła GET request do API i zwraca konkretny samolot

**Koncepcja**: Observable z `HttpClient` zwraca strumień danych. Funkcja `firstValueFrom()` konwertuje Observable na Promise, umożliwiając użycie `async/await` w komponencie. Odpowiedź API zawiera tablicę `states`, gdzie każdy element to tablica danych samolotu (callsign na indeksie [1], kraj na [2], wysokość na [7] itd.).
