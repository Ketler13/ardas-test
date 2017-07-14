import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { Task } from './task';

@Injectable()
export class TaskService {
  private tasks: Task[];

  constructor(private http: Http) { }

  getTasks(): Observable<Task[]> {
    if (this.tasks && this.tasks.length) {
      return Observable.of(this.tasks);
    }
    const url = 'http://demo6366835.mockable.io/';
    return this.http.get(url)
      .map(res => res.json() as Task[])
      .do(tasks => this.tasks = tasks)
      .catch(err => Observable.throw('network error'));
  }

  getTask(id: number): Observable<Task> {
    if (this.tasks && this.tasks.length) {
      const task = this.tasks.filter(task => task.id === id)[0];
      return Observable.of(task);
    } else {
      return Observable.throw('no such task');
    }
  }

  updateTaskName(name: string, id: number): Observable<boolean> {
    const url = 'http://demo6366835.mockable.io/';
    return this.http.put(url, null, null)
      .map(res => {
        if (res.json().success) {
          this.tasks = this.tasks.map(task => {
            if (task.id !== id) { return task }
            return {
              ...task,
              name
            }
          });
          return true;
        }
        return false;
      });
  }

}
