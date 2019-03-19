import { DatePipe } from '@angular/common';
import { TestBed, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchPipePipe } from '../pipes/search-pipe.pipe';

import { ProjectService } from '../services/project.service';



import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        ProjectComponent,
        SearchPipePipe,
      ],
      providers: [ProjectService, UserService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
