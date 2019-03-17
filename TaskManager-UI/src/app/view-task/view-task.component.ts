import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
  providers: [ProjectService, TaskService]
})
export class ViewTaskComponent implements OnInit {

  allProjects: any[];
  allTaskperProject: any[];
  selectedProjectID = null;
  viewTaskForm: FormGroup;

  constructor(private fb: FormBuilder,
    public projectservice: ProjectService,
    public taskservice: TaskService) { }

  ngOnInit() {
    this.getProjects();
    this.createForm();
  }

  createForm() {
    this.viewTaskForm = this.fb.group({
      projectName: [null, Validators.required],
    });
  }

  getProjects() {
    this.projectservice.fetchProject().subscribe(data => {
      this.allProjects = data;
      console.log(this.allProjects);
    },
      error => {
        console.log(error);
      });
  }

  selectProject(projectID, projectName) {
    this.selectedProjectID = null;
    this.allTaskperProject = [];
    this.selectedProjectID = projectID;
    this.viewTaskForm.controls['projectName'].setValue(projectName);
    console.log(this.selectedProjectID);
    this.fetchTask(this.selectedProjectID);
  }

  fetchTask(projectID) {
    this.taskservice.fetchTask().subscribe(data => {
      for (const eachData of data) {
        if (eachData.projectId._id === projectID) {
          this.allTaskperProject.push(eachData);
        }
      }
      console.log(this.allTaskperProject);
    },
      error => {
        console.log(error);
      });
  }

  suspendTask(singleTask) {
    let taskObj = null;
    if (singleTask.parentTask) {
      taskObj = {
        projectId: singleTask.projectId._id,
        taskName: singleTask.taskName,
        parentTask: singleTask.parentTask,
        priority: singleTask.priority,
        parentTaskId: null,
        startDate: singleTask.startDate,
        endDate: singleTask.endDate,
        user: null,
        completed: true
      };
    } else {
      taskObj = {
        projectId: singleTask.projectId._id,
        taskName: singleTask.taskName,
        parentTask: singleTask.parentTask,
        priority: singleTask.priority,
        parentTaskId: singleTask.parentTaskId._id,
        startDate: singleTask.startDate,
        endDate: singleTask.endDate,
        user: singleTask.user._id,
        completed: true
      };

    }

    this.taskservice.editTask(singleTask._id, taskObj).subscribe(res => {
      alert('Task Suspended successfully');
      this.getProjects();

    },
      error => {
        console.log(error);
      });
  }

  editTask(singleTask) {
    localStorage.setItem('task', JSON.stringify(singleTask));
  }

  sortTaskByDate(param) {
    const temp = this.allTaskperProject.sort((n1, n2) => {
      if (new Date((n1[param])) > new Date((n2[param]))) {
        return 1;
      }
      if (new Date((n1[param])) < new Date((n2[param]))) {
        return -1;
      }
      return 0;
    });
    this.allTaskperProject = null;
    this.allTaskperProject = [];
    this.allTaskperProject = temp;
  }

  sortTaskByPriority(param) {
    const temp = this.allTaskperProject.sort((n1, n2) => {
      if (+n1[param] < +n2[param]) {
        console.log(n1[param], n2[param]);
        return 1;
      }

      if (+n1[param] > +n2[param]) {
        return -1;
      }
      return 0;
    });
    this.allTaskperProject = null;
    this.allTaskperProject = [];
    this.allTaskperProject = temp;
    console.log(this.allTaskperProject);

  }

}
