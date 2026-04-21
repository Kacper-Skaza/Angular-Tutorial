import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItem],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  // @Input to właściwości przekazane z komponentu rodzica (jak atrybuty w HTML)
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) tasks: Task[] = [];
  // @Output to emitter zdarzeń wysyłane do rodzica (jak event listener w HTML)
  @Output() toggle = new EventEmitter<number>();
}
