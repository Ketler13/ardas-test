import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-list/task-item/task-item.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';

import { TaskService } from './shared/task.service';
import { OnlyActivePipe } from './shared/only-active.pipe';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/:id', component: TaskPageComponent },
  { path: '404', component: ErrorPageComponent },
  { path: '**', redirectTo:'404', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskItemComponent,
    OnlyActivePipe,
    TaskPageComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
