# To-Do App

Prosta aplikacja do zarządzania zadaniami zbudowana w Angular z wykorzystaniem nowoczesnych rozwiązań frameworka. Aplikacja pozwala na dodawanie, przeglądanie i zaznaczanie zadań jako ukończone.

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

## Zadanie 1: Usuwanie zadań z listy

Dodaj do aplikacji funkcjonalność usuwania zadań z listy:

1. **Dodaj metodę w serwisie** (`src/app/services/task.service.ts`):
   - Utwórz metodę `deleteTask(id: number)` 
   - Powinna filtrować tablicę i usuwać zadanie o danym ID (możesz użyć `array.filter()`)
   - Użyj `update()` żeby zaktualizować signal (analogicznie do `addTask()` i `toggleTask()`)

2. **Dodaj przycisk do TaskItem.html** (`src/app/components/task-item/task-item.html`):
   - Przycisk powinien emitować zdarzenie `deleteTask` przy kliknięciu (event binding `(click)`)
   - W metodzie obsługującej klikniecie przycisku emituj ID zadania

3. **Dodaj output do TaskItem.ts** (`src/app/components/task-item/task-item.ts`):
   - Dodaj nowy `@Output() deleteTask = ...`

4. **Obsłuż event w TaskList** (`src/app/components/task-list/task-list.ts` + `task-list.html`):
   - Dodaj nowy `@Output()` 
   - W szablonie HTML obsłuż event z TaskItem (analogicznie do `statusChanged`)

5. **Obsłuż event w App** (`src/app/app.ts` + `src/app/app.html`):
   - Dodaj metodę `handleDeleteTask(id: number)` która wywoła `this.taskService.deleteTask(id)`
   - W szablonie HTML obsłuż event z TaskList (analogicznie do `toggle`)

## Struktura plików

### 1. Model danych: `src/app/models/task.model.ts`

Interfejs TypeScript definiujący strukturę zadania:
- `id` - unikalny identyfikator
- `title` - tekst zadania
- `isDone` - status ukończenia

Jest to model danych używany w całej aplikacji.

### 2. Serwis: `src/app/services/task.service.ts`

Centralny punkt zarządzania danymi. Serwis:
- Przechowuje listę zadań w `signal<Task[]>()` - reaktywnej zmiennej
- `addTask()` - dodaje nowe zadanie do listy
- `toggleTask()` - zmienia status zadania (done/todo)
- Jest singletonem (jedna instancja dla całej aplikacji)

### 3. Komponent główny: `src/app/app.ts` + `src/app/app.html`

**TypeScript** (`app.ts`):
- Wstrzykuje serwis TaskService za pomocą `inject()`
- `showModal` - signal kontrolujący widoczność modala
- `todoTasks` i `doneTasks` - computed properties automatycznie filtrujące zadania
- `handleAddTask()` - dodaje zadanie i zamyka modal

**Szablon** (`app.html`):
- Przycisk do otwarcia modala z event binding `(click)`
- Dwie kolumny z komponentami `TaskList` (property binding `[tasks]` i output `(toggle)`)
- Warunkowe renderowanie modala z dyrektywą `@if`

### 4. Komponent TaskList: `src/app/components/task-list/task-list.ts` + `task-list.html`

**TypeScript** (`task-list.ts`):
- `@Input title` i `@Input tasks` - dane przekazane z rodzica
- `@Output toggle` - emitter do wysyłania zdarzeń do rodzica

**Szablon** (`task-list.html`):
- Interpolacja `{{ }}` - wyświetla tytuł i liczbę zadań
- Pętla `@for` - renderuje listę komponentów TaskItem

### 5. Komponent TaskItem: `src/app/components/task-item/task-item.ts` + `task-item.html`

**TypeScript** (`task-item.ts`):
- `@Input task` - pojedyncze zadanie
- `@Output statusChanged` - emitter wysyłający ID zadania przy kliknięciu

**Szablon** (`task-item.html`):
- Class binding `[class.done]` - dodaje klasę CSS gdy zadanie jest ukończone
- Ternary operator `?:` - warunkowo wyświetla tekst przycisku
- Event binding `(click)` - wysyła zdarzenie do rodzica

### 6. Komponent TaskModal: `src/app/components/task-modal/task-modal.ts` + `task-modal.html`

**TypeScript** (`task-modal.ts`):
- `title` - zmienna przechowująca wartość inputu
- `@Output add` - emitter wysyłający nowy tekst zadania
- `submit()` - waliduje i wysyła nowe zadanie

**Szablon** (`task-modal.html`):
- Two-way binding `[(ngModel)]` - synchronizuje wartość inputu ze zmienną `title`
- Event filter `(keyup.enter)` - wykonuje submit po naciśnięciu Enter
