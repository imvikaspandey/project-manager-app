import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TaskManagerRouting } from './app.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipePipe } from './pipes/search-pipe.pipe';
import { ProjectComponent } from './project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SearchPipePipe,
    ProjectComponent
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
