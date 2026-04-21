import { Component, Output, EventEmitter, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  // FormsModule dodaje [(ngModel)] do dwukierunkowego bindowania z formularzem HTML (patrz task-modal.html)
  imports: [FormsModule],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.css',
})
export class TaskModal {
  title = '';
  @Output() add = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  // Wysyła nowe zadanie do rodzica i czyści pole tekstowe
  submit() {
    if (this.title.trim()) {
      this.add.emit(this.title);
      this.title = '';
    }
  }
}
