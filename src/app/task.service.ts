import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  constructor(private http: Http) { }

  getTasks() {
    const url = 'http://demo6366835.mockable.io/';
    return this.http.get(url)
      .map(res => res.json())
      .subscribe(console.log);
  }

}
