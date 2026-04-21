import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

// Singleton zarządzający stanem zadań - dostępny globalnie w aplikacji
@Injectable({ providedIn: 'root' })
export class TaskService {
  // Signal to reaktywna zmienna, Angular automatycznie odświeża widok po zmianach
  tasks = signal<Task[]>([
    { id: 1, title: 'Kupić mleko', isDone: false },
    { id: 2, title: 'Pokazać prezentację', isDone: false },
    { id: 3, title: 'Nauczyć się Angulara', isDone: true }
  ]);

  // Dodaje nowe zadanie - update() tworzy nową tablicę zamiast mutować istniejącą
  // Angular wykryje zmianę referencji i odświeży widok
  addTask(title: string) {
    const newTask: Task = { id: Date.now(), title, isDone: false };
    this.tasks.update(current => [...current, newTask]);
  }

  // Przełącza status zadania między done/todo - map() tworzy nową tablicę ze zmienioną wartością
  toggleTask(id: number) {
    this.tasks.update(current =>
      current.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t)
    );
  }
}
