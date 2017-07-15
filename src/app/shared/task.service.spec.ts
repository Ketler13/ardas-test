import { TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { TaskService } from './task.service';
import { tasks } from './mockedTasks';

describe('TaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {provide: XHRBackend, useClass: MockBackend},
        TaskService
      ]
    });
  });

  it('getTasks() loads tasks', inject([XHRBackend, TaskService], (mockBackend: MockBackend, service: TaskService) => {
    mockBackend.connections.subscribe( (connection: MockConnection) => {
      const responseOptions = new ResponseOptions({
        body: JSON.stringify(tasks)
      });
      connection.mockRespond(new Response(responseOptions));
      expect(connection.request.url).toBe('http://demo6366835.mockable.io/');
    });

    service.getTasks().subscribe(res => {
      expect(res).toEqual(tasks);
      expect(service.tasks).toEqual(tasks);
    });
  }));

  it('getTask() loads task by id from cache', inject([XHRBackend, TaskService], (mockBackend: MockBackend, service: TaskService) => {
    service.tasks = tasks;
    service.getTask(0).subscribe(res => {
      expect(res).toEqual(tasks[0]);
    });
  }));

  it('getTask() loads task when cache is empty', inject([XHRBackend, TaskService], (mockBackend: MockBackend, service: TaskService) => {
    mockBackend.connections.subscribe( (connection: MockConnection) => {
      const responseOptions = new ResponseOptions({
        body: JSON.stringify(tasks)
      });
      connection.mockRespond(new Response(responseOptions));
      expect(connection.request.url).toBe('http://demo6366835.mockable.io/');
    });

    service.getTask(0).subscribe(res => {
      expect(res).toEqual(tasks[0]);
    });
  }));

  it('updateTaskName() returns true if success', inject([XHRBackend, TaskService], (mockBackend: MockBackend, service: TaskService) => {
    service.tasks = tasks;
    mockBackend.connections.subscribe( (connection: MockConnection) => {
      const responseOptions = new ResponseOptions({
        body: JSON.stringify({success: true})
      });
      connection.mockRespond(new Response(responseOptions));
      expect(connection.request.url).toBe('http://demo6366835.mockable.io/');
    });

    service.updateTaskName('new_name', 0).subscribe(res => {
      expect(res).toBeTruthy();
    });
  }));

  it('updateTaskName() returns false if no success', inject([XHRBackend, TaskService], (mockBackend: MockBackend, service: TaskService) => {
    service.tasks = tasks;
    mockBackend.connections.subscribe( (connection: MockConnection) => {
      const responseOptions = new ResponseOptions({
        body: JSON.stringify({success: false})
      });
      connection.mockRespond(new Response(responseOptions));
    });

    service.updateTaskName('new_name', 0).subscribe(res => {
      expect(res).toBeFalsy();
    });
  }));

  it('updateTaskName() updates task if success', inject([XHRBackend, TaskService], (mockBackend: MockBackend, service: TaskService) => {
    service.tasks = tasks;
    mockBackend.connections.subscribe( (connection: MockConnection) => {
      const responseOptions = new ResponseOptions({
        body: JSON.stringify({success: true})
      });
      connection.mockRespond(new Response(responseOptions));
    });

    service.updateTaskName('new_name', 0).subscribe(res => {
      expect(service.tasks[0].name).toBe('new_name');
    });
  }));

  it('updateTaskName() donesn\'t update task if no success', inject([XHRBackend, TaskService], (mockBackend: MockBackend, service: TaskService) => {
    service.tasks = tasks;
    mockBackend.connections.subscribe( (connection: MockConnection) => {
      const responseOptions = new ResponseOptions({
        body: JSON.stringify({success: false})
      });
      connection.mockRespond(new Response(responseOptions));
    });

    service.updateTaskName('new_name', 0).subscribe(res => {
      expect(service.tasks[0].name).toBe(tasks[0].name);
    });
  }));
});
