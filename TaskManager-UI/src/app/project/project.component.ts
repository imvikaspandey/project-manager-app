import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [ProjectService, UserService]
})
export class ProjectComponent implements OnInit {

  allProjects: any[];
  editing = false;
  selectedProject: any;
  searchText = '';
  searchProjectText = '';
  allUsers: any;

  selectedMgrID = null;


  dateFielldsActive = true;
  addProjectForm: FormGroup;

  constructor(private fb: FormBuilder,
    public projectservice: ProjectService,
    public userservice: UserService) { }

  ngOnInit() {
    this.createForm();
    this.getProjects();
    this.getUsers();
    this.addProjectForm.get('startDate').disable();
    this.addProjectForm.get('endDate').disable();
  }

  setActiveDate() {
    this.dateFielldsActive = !this.dateFielldsActive;
    if (this.dateFielldsActive) {
      this.addProjectForm.get('startDate').disable();
      this.addProjectForm.get('endDate').disable();
    } else {
      this.addProjectForm.get('startDate').enable();
      this.addProjectForm.get('endDate').enable();

      if (!this.addProjectForm.value.startDate) {
        this.addProjectForm.patchValue({
          startDate: this.dateFormatter(new Date(), 'yyyy-MM-dd'),
          endDate: this.dateFormatter(new Date(new Date().setDate(new Date().getDate() + 1)), 'yyyy-MM-dd'),
        });
      }
    }


  }

  dateFormatter(date: Date, format: string): any {
    if (!date) { return null; }
    return new DatePipe("en-US").transform(date, format);
  }

  createForm() {
    this.addProjectForm = this.fb.group({
      projectName: [null, Validators.required],
      startDate: null,
      endDate: null,
      manager: [null, Validators.required],
      priority: 0,
    });
  }

  editForm(singleProject) {
    this.addProjectForm.setValue({
      projectName: singleProject.projectName,
      startDate: singleProject.startDate,
      endDate: singleProject.endDate,
      manager: singleProject.manager.firstName + ' ' + singleProject.manager.lastName,
      priority: singleProject.priority
    });
    this.selectedProject = singleProject;
    this.selectedMgrID = singleProject.manager._id;


    this.editing = true;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  getProjects() {
    this.projectservice.fetchProject().subscribe(data => {
      this.allProjects = data;
    },
      error => {
        console.log(error);
      });
  }

  getUsers() {
    this.userservice.fetchUsers().subscribe(data => {
      this.allUsers = data;
    },
      error => {
        console.log(error);
      });
  }

  selectManager(mgrID, mgrFirstName, mgrLastName) {
    const mgrName = mgrFirstName + ' ' + mgrLastName;
    this.selectedMgrID = mgrID;
    this.addProjectForm.controls['manager'].setValue(mgrName);
  }

  resetForm() {
    this.addProjectForm.setValue({
      projectName: null,
      startDate: null,
      endDate: null,
      manager: null,
      priority: 0,
    });

    this.selectedMgrID = null;
    this.editing = false;
  }

  suspendProject(singleProject) {
    const projectObj = {
      projectName: singleProject.projectName,
      startDate: singleProject.startDate ? singleProject.startDate : null,
      endDate: singleProject.endDate ? singleProject.endDate : null,
      manager: singleProject.manager._id,
      priority: singleProject.priority,
      completed: true
    };
    this.projectservice.editProject(singleProject._id, projectObj).subscribe(res => {
      alert('Project Suspended successfully');
      this.editing = false;
      this.resetForm();
      this.getProjects();

    },
      error => {
        console.log(error);
      });
  }

  onSubmit() {
    let projectObj = null;
    if (this.addProjectForm.value) {
      if (this.addProjectForm.value.startDate) {
        if (this.addProjectForm.value.startDate < this.addProjectForm.value.endDate) {
          projectObj = {
            projectName: this.addProjectForm.value.projectName,
            startDate: this.addProjectForm.value.startDate,
            endDate: this.addProjectForm.value.endDate,
            manager: this.selectedMgrID,
            priority: this.addProjectForm.value.priority,
          };
          if (this.editing === false) {
            this.projectservice.createProject(projectObj).subscribe(res => {
              alert('Project Created successfully');
              this.resetForm();
              this.getProjects();
            },
              error => {
                console.log(error);
              });
          }
          if (this.editing === true) {
            this.projectservice.editProject(this.selectedProject._id, projectObj).subscribe(res => {
              alert('Project Updated successfully');
              this.editing = false;
              this.resetForm();
              this.getProjects();

            },
              error => {
                console.log(error);
              });

          } // editing true ends
        } else {
          alert('Start Date should be greater than End Date');
        }
      } else {
        projectObj = {
          projectName: this.addProjectForm.value.projectName,
          startDate: this.addProjectForm.value.startDate ? this.addProjectForm.value.startDate : null,
          endDate: this.addProjectForm.value.endDate ? this.addProjectForm.value.endDate : null,
          manager: this.selectedMgrID,
          priority: this.addProjectForm.value.priority,
        };
        if (this.editing === false) {
          this.projectservice.createProject(projectObj).subscribe(res => {
            alert('Project Created successfully');
            this.resetForm();
            this.getProjects();
          },
            error => {
              console.log(error);
            });
        }
        if (this.editing === true) {
          this.projectservice.editProject(this.selectedProject._id, projectObj).subscribe(res => {
            alert('Project Updated successfully');
            this.editing = false;
            this.resetForm();
            this.getProjects();
          },
            error => {
              console.log(error);
            });
        }  // editing true ends
      }
    }
  } // on Submit ends

  sortProjectByDate(param) {
    const temp = this.allProjects.sort((n1, n2) => {
      if (new Date((n1[param])) > new Date((n2[param]))) {
        return 1;
      }
      if (new Date((n1[param])) < new Date((n2[param]))) {
        return -1;
      }
      return 0;
    });
    this.allProjects = null;
    this.allProjects = [];
    this.allProjects = temp;
  }

  sortProjectByPriority(param) {
    const temp = this.allProjects.sort((n1, n2) => {
      if (+n1[param] > +n2[param]) {
        return 1;
      }

      if (+n1[param] < +n2[param]) {
        return -1;
      }
      return 0;
    });
    this.allProjects = null;
    this.allProjects = [];
    this.allProjects = temp;

  }

  sortProjectByCompletedTask(param) {
    const temp = this.allProjects.sort((n1, n2) => {
      if (n1[param].length > n2[param].length) {
        return 1;
      }
      if (n1[param].length < n2[param].length) {
        return -1;
      }
      return 0;
    });
    this.allProjects = null;
    this.allProjects = [];
    this.allProjects = temp;
  }

}
