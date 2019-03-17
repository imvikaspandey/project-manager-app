import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css'],
  providers: [ProjectService, UserService, TaskService]
})
export class AddTasksComponent implements OnInit {

  allUsers: any;
  allProjects: any[];
  addTaskForm: FormGroup;
  allParentTask: any[];
  isParentTask = false;

  selectedProjectID = null;
  selectedtaskID = null;
  selectedUserID = null;

  editing = false;
  taskToEditID = null;


  constructor(private fb: FormBuilder,
    public projectservice: ProjectService,
    public userservice: UserService,
    public taskservice: TaskService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProjects();
    this.getUsers();
    this.fetchParentTask();
    this.createForm();

    this.addTaskForm.patchValue({
      startDate: this.dateFormatter(new Date(), 'yyyy-MM-dd'),
      endDate: this.dateFormatter(new Date(new Date().setDate(new Date().getDate() + 1)), 'yyyy-MM-dd'),
    });

    // this.route.queryParams.subscribe(params => {
    //   console.log(params.projectId);
    // });
    const myTask = JSON.parse(localStorage.getItem('task'));
    if (myTask != null) {
      this.taskToEditID = myTask._id;
      this.updateTask(myTask);
    }
    console.log(myTask);
  }

  dateFormatter(date: Date, format: string): any {
    if (!date) { return null; }
    return new DatePipe('en-US').transform(date, format);
  }


  setAsParentTask() {

    this.isParentTask = !this.isParentTask;
    if (this.isParentTask) {
      this.addTaskForm.get('priority').disable();
      this.addTaskForm.get('parentTaskName').disable();
      this.addTaskForm.get('startDate').disable();
      this.addTaskForm.get('endDate').disable();
      this.addTaskForm.get('user').disable();

    } else {
      this.addTaskForm.get('priority').enable();
      this.addTaskForm.get('parentTaskName').enable();
      this.addTaskForm.get('startDate').enable();
      this.addTaskForm.get('endDate').enable();
      this.addTaskForm.get('user').enable();
    }
  }

  createForm() {
    this.addTaskForm = this.fb.group({
      projectName: [null, Validators.required],
      taskName: [null, Validators.required],
      parentTask: null,
      priority: 0,
      parentTaskName: null,
      startDate: null,
      endDate: null,
      user: null,
    });
  }

  resetForm() {
    this.addTaskForm.setValue({
      projectName: null,
      taskName: null,
      parentTask: null,
      priority: 0,
      parentTaskName: null,
      startDate: null,
      endDate: null,
      user: null,
    });

    this.selectedUserID = null;
    this.selectParentTask = null;
    this.selectProject = null;
    this.editing = false;
    this.taskToEditID = null;
    localStorage.removeItem('task');
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

  fetchParentTask() {
    this.taskservice.fetchParentTask().subscribe(data => {
      this.allParentTask = data;
      console.log(this.allParentTask);
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

  selectProject(projectID, projectName) {
    this.selectedProjectID = projectID;
    this.addTaskForm.controls['projectName'].setValue(projectName);
    console.log(this.selectedProjectID);
  }

  selectParentTask(taskID, taskName) {
    this.selectedtaskID = taskID;
    this.addTaskForm.controls['parentTaskName'].setValue(taskName);
    console.log(this.selectedtaskID);
  }

  selectUser(userID, firstName, lastName) {
    const mgrName = firstName + ' ' + lastName;
    this.selectedUserID = userID;
    this.addTaskForm.controls['user'].setValue(mgrName);
  }

  onSubmit() {
    let taskObj = null;
    console.log(this.addTaskForm);
    if (this.addTaskForm.value) {
      if (!this.isParentTask) {
        if (this.addTaskForm.value.startDate < this.addTaskForm.value.endDate) {
          taskObj = {
            projectId: this.selectedProjectID,
            taskName: this.addTaskForm.value.taskName,
            parentTask: this.isParentTask,
            priority: this.addTaskForm.value.priority,
            parentTaskId: this.selectedtaskID,
            startDate: this.addTaskForm.value.startDate,
            endDate: this.addTaskForm.value.endDate,
            user: this.selectedUserID,
            completed: false

          };
        }
      } else {

        console.log('Parent task');

        taskObj = {
          projectId: this.selectedProjectID,
          taskName: this.addTaskForm.value.taskName,
          parentTask: this.isParentTask,
          priority: 0,
          parentTaskId: null,
          startDate: this.dateFormatter(new Date(), 'yyyy-MM-dd'),
          endDate: this.dateFormatter(new Date(new Date().setDate(new Date().getDate() + 1)), 'yyyy-MM-dd'),
          user: null,
          completed: false
        };
      }
      if (this.editing === false) {
        this.taskservice.createTask(taskObj).subscribe(res => {
          alert('Task Created successfully');
          console.log(res);
          this.resetForm();

        },
          error => {
            console.log(error);
            this.resetForm();
          });
      } else {
        this.taskservice.editTask(this.taskToEditID, taskObj).subscribe(res => {
          alert('Task Updated successfully');
          console.log(res);
          this.resetForm();
          this.taskToEditID = null;

        },
          error => {
            console.log(error);
            this.resetForm();
          });
      }
    }
    this.selectedUserID = null;
    this.selectParentTask = null;
    this.selectProject = null;
    this.editing = false;
    this.taskToEditID = null;

    localStorage.removeItem('task');
  } // on Submit ends

  updateTask(singleTask) {
    this.editing = true;

    if (!singleTask.parentTask) {
      this.addTaskForm.setValue({
        projectName: singleTask.projectId.projectName,
        taskName: singleTask.taskName,
        parentTask: singleTask.parentTask,
        priority: singleTask.priority,
        parentTaskName: singleTask.parentTaskId.taskName,
        startDate: singleTask.startDate,
        endDate: singleTask.endDate,
        user: singleTask.user.firstName + singleTask.user.lastName,
      });
      this.selectedUserID = singleTask.user._id;
      this.selectedtaskID = singleTask.parentTaskId._id;
      this.selectedProjectID = singleTask.projectId._id;
    }
    if (singleTask.parentTask) {
      this.addTaskForm.setValue({
        projectName: singleTask.projectId.projectName,
        taskName: singleTask.taskName,
        parentTask: singleTask.parentTask,
        priority: singleTask.priority,
        parentTaskName: null,
        startDate: singleTask.startDate,
        endDate: singleTask.endDate,
        user: null,
      });

      this.selectedUserID = null;
      this.selectedtaskID = null;
      this.selectedProjectID = singleTask.projectId._id;
    }
    localStorage.removeItem('task');
    console.log(this.selectedProjectID);
    console.log(this.selectedUserID);


  }

}
