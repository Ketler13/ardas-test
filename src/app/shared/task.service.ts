import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Task } from './task';

@Injectable()
export class TaskService {

  constructor(private http: Http) { }

  getTasks(): Observable<Task[]> {
    const url = 'http://demo6366835.mockable.io/';
    return this.http.get(url)
      .map(res => res.json() as Task[]);
  }

}
