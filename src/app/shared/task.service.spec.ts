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

  it('should load tasks', inject([XHRBackend, TaskService], (mockBackend: MockBackend, service: TaskService) => {
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
});
