import { TestBed, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchPipePipe } from '../pipes/search-pipe.pipe';

import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';

import { ViewTaskComponent } from './view-task.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { routes } from '../app.routing';
import { AddTasksComponent } from '../add-tasks/add-tasks.component';
import { UserComponent } from '../user/user.component';
import { ProjectComponent } from '../project/project.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),

      ],
      declarations: [
        ViewTaskComponent,
        AddTasksComponent,
        UserComponent,
        ProjectComponent,
        SearchPipePipe,
      ],
      providers: [ProjectService, UserService, TaskService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents().then(() => {
        router = TestBed.get(Router);
        location = TestBed.get(Location);

        fixture = TestBed.createComponent(ViewTaskComponent);
        router.initialNavigation();
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
