import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import { By } from '@angular/platform-browser';

import { TaskItemComponent } from './task-item.component';
import { tasks } from '../../shared/mockedTasks';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskItemComponent ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = tasks[0];
    de = fixture.debugElement.query(By.css('h3'));
    el = de.nativeElement;
  });

  it('name property should be same as in mock', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(tasks[0].name);
  });

  it('name property should be changed', () => {
    component.task = tasks[1];
    fixture.detectChanges();
    expect(el.textContent).toContain(tasks[1].name);
  });
});
