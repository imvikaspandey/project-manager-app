import { AppComponent } from './app.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { routes } from './app.routing';
import { TestBed, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipePipe } from './pipes/search-pipe.pipe';
import { ProjectComponent } from './project/project.component';
import { AddTasksComponent } from './add-tasks/add-tasks.component';
import { ViewTaskComponent } from './view-task/view-task.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let location: Location;
  let router: Router;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        UserComponent,
        SearchPipePipe,
        ProjectComponent,
        AddTasksComponent,
        ViewTaskComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {
      router = TestBed.get(Router);
      location = TestBed.get(Location);

      fixture = TestBed.createComponent(AppComponent);
      router.initialNavigation();
    });
  }));
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  });

  // specs to test app routing

  it('navigate to "View Task" redirects you to /viewTask', fakeAsync(() => {
    router.navigate(['/viewTask']);
    tick();
    expect(location.path()).toBe('/viewTask');
  }));

  it('navigate to "Add Task" takes you to /addTask', fakeAsync(() => {
    router.navigate(['/addTask']);
    tick();
    expect(location.path()).toBe('/addTask');
  }));

  it('navigate to "projects" takes you to /projects', fakeAsync(() => {
    router.navigate(['/projects']);
    tick();
    expect(location.path()).toBe('/projects');
  }));

  it('navigate to "user" takes you to /user', fakeAsync(() => {
    router.navigate(['/user']);
    tick();
    expect(location.path()).toBe('/user');
  }));

});
