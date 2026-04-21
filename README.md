# Angular Tutorial

Repozytorium zawiera dwie aplikacje demonstracyjne wprowadzające w podstawy frameworka Angular.

### Wymagania

Instrukcja instalacji wymaganych narzędzi znajduje się w prezentacji na slajdach 11 i 12:
- **Node.js** - środowisko uruchomieniowe JavaScript
- **npm** - menedżer pakietów Node.js (instalowany wraz z Node.js)
- **Angular CLI** - narzędzie linii poleceń do zarządzania projektami Angular

### Uruchamianie

Każda aplikacja znajduje się w osobnym folderze i ma własną konfigurację. Aby uruchomić wybraną aplikację:
```bash
cd nazwa_katalogu_projektu
npm install
ng serve --open
```
- Aplikacja będzie dostępna pod adresem `http://localhost:4200/`
- Komendę `npm install` należy wykonać tylko przy pierwszym uruchomieniu aplikacji, aby zainstalować niezbędne zależności

## Aplikacje i zadania

### 1. To-Do App

#### Opis
Prosta aplikacja do zarządzania listą zadań. Projekt obejmuje:
- Dodawanie zadań
- Oznaczanie zadań jako ukończone

> #### Zadanie 1/3
> Dodaj do aplikacji funkcjonalność usuwania zadań z listy  
> Więcej szczegółów znajduje się w pliku [`README.md`](to-do-app/README.md) projektu

### 2. Flight-Info App

#### Opis
Prosta aplikacja do wyszukiwania informacji o samolotach w powietrzu w czasie rzeczywistym. Projekt obejmuje:
- Komunikację z zewnętrznym API (OpenSky Network)
- Wyszukiwanie danych
- Obsługę błędów sieci

> #### Zadanie 2/3
> Rozszerz `FlightService` o walidację numeru lotu przed wysłaniem żądania do API  
> Więcej szczegółów znajduje się w pliku [`README.md`](flight-info-app/README.md) projektu

### 3. Flight-Watchlist App

#### Opis
Złożona aplikacja do monitorowania wybranych lotów. Projekt łączy funkcjonalności obu poprzednich aplikacji.

> #### Zadanie 3/3
> Stwórz aplikację Angular `Flight-Watchlist App` wykorzystując komponenty z poprzednich projektów  
> Szablon aplikacji można utworzyć za pomocą komendy: `ng new flight-watchlist-app`
> 
> Aplikacja powinna zawierać:
> - Dodawanie numerów lotów do listy obserwowanych
> - Możliwość usuwania lotów z listy obserwowanych
> - Przycisk "Sprawdź" przy każdym locie
> - Pobieranie danych o locie po kliknięciu powyższego przycisku (OpenSky Network)
> - Wyświetlanie szczegółów lotu (callsign, kraj, wysokość, prędkość, kierunek)
> - Obsługę błędów (nieistniejący lot, brak odpowiedzi API, niepoprawny numer lotu)
>
> ⚠️ **Uwaga** ⚠️  
> Korzystanie z OpenSky Network API wymaga konfiguracji proxy, w tym celu:
> 1. Skopiuj plik `proxy.conf.json` z katalogu głównego projektu `flight-info-app`
> 2. Przenieś konfigurację proxy z pliku `angular.json` z projektu `flight-info-app` (linie 57–59) do swojej aplikacji

## Kluczowe koncepty Angular

| Koncept | Opis |
|---------|------|
| **Signal** | Reaktywna zmienna - Angular automatycznie odświeża widok gdy się zmieni |
| **Computed** | Automatic dependency tracking - przelicza się gdy zmienią się jego zależności |
| **Dependency Injection** | `inject()` pobiera instancje serwisów |
| **@Input** | Właściwości przekazane z komponentu rodzica |
| **@Output** | Emitter zdarzeń wysyłane do rodzica |
| **Event Binding** | `(click)`, `(keyup.enter)` - nasłuchiwanie zdarzeń |
| **Property Binding** | `[property]` - przekazywanie danych do komponentu |
| **Two-way Binding** | `[(ngModel)]` - zmiana w obydwie strony |
| **Interpolacja** | `{{ }}` - wstawianie wartości do HTML |
| **Directives** | `@if`, `@for` - warunkowe renderowanie i pętle |
