import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  // ! (non-null assertion) mówi TypeScriptowi że task zawsze będzie ustawione
  @Input({ required: true }) task!: Task;
  // Wysyła ID zadania do rodzica gdy kliknie na przycisk zmiany statusu
  @Output() statusChanged = new EventEmitter<number>();
}
