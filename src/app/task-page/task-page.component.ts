import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import { TaskService }from '../shared/task.service';
import { Task } from '../shared/task';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {
  task: Task;
  error: string = null;
  editorIsOpen = false;
  taskName: string;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadTask();
  }

  toggleEditor(): void {
    this.editorIsOpen = !this.editorIsOpen;
  }

  updateName(name: string): void {
    if (name && (name !== this.task.name)) {
      this.taskService.updateTaskName(name, this.task.id)
        .filter(res => res)
        .subscribe(res => {
          this.taskName = name;
          this.toggleEditor();
        });
    }
  }

  loadTask(): void {
    this.route.params
      .switchMap(params => this.taskService.getTask(+params.id))
      .subscribe(
        task => {
          if (!task) {
            this.router.navigate(['404']);
            return;
          }
          this.task = task;
          this.taskName = this.task.name;
        },
        error => this.error = error
      );
  }

}
