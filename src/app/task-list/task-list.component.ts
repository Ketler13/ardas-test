import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/filter';

import { TaskService } from '../shared/task.service';
import { Task } from '../shared/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  taskList: Task[];
  loading = false;
  error: string = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loading = true;
    this.error = null;
    this.taskService.getTasks()
      .subscribe(
        tasks => {
          this.taskList = tasks;
          this.loading = false;
          this.error = null;
        },
        error => this.error = error
      );
  }

}
