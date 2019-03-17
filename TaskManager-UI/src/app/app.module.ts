import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TaskManagerRouting } from './app.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipePipe } from './pipes/search-pipe.pipe';
import { ProjectComponent } from './project/project.component';
import { AddTasksComponent } from './add-tasks/add-tasks.component';
import { ViewTaskComponent } from './view-task/view-task.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SearchPipePipe,
    ProjectComponent,
    AddTasksComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    TaskManagerRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
