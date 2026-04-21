import { Component, computed, inject, signal } from '@angular/core';
import { TaskService } from './services/task.service';
import { TaskList } from './components/task-list/task-list';
import { TaskModal } from './components/task-modal/task-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskList, TaskModal],
  templateUrl: './app.html',
})
export class App {
  // inject() pobiera instancję serwisu (jak dependency injection w innych frameworkach)
  protected taskService = inject(TaskService);
  // Signal to reaktywna zmienna - Angular automatycznie odświeża widok gdy się zmieni
  showModal = signal(false);

  // computed() automatycznie przelicza wartość kiedy zmieniają się dane
  todoTasks = computed(() => this.taskService.tasks().filter(t => !t.isDone));
  doneTasks = computed(() => this.taskService.tasks().filter(t => t.isDone));

  handleAddTask(title: string) {
    this.taskService.addTask(title);
    this.showModal.set(false);
  }
}
