import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  addUserForm: FormGroup;
  allUsers: any[];
  editing = false;
  selectedUser: any;
  searchText = '';

  constructor(
    private fb: FormBuilder,
    public userservice: UserService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.getUsers();
  }

  createForm() {
    this.addUserForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      employeeID: [null, Validators.required],
    });
  }

  editForm(singleUser) {
    this.addUserForm.setValue({
      firstName: singleUser.firstName,
      lastName: singleUser.lastName,
      employeeID: singleUser.employeeID,
    });
    this.selectedUser = singleUser;
    this.editing = true;
  }

  resetForm() {
    this.addUserForm.setValue({
      firstName: null,
      lastName: null,
      employeeID: null,
    });

    this.editing = false;
  }
  onSubmit() {
    console.log(this.addUserForm);
    if (this.addUserForm.value) {
      if (this.editing === false) {
        this.userservice.createUser(this.addUserForm.value).subscribe(res => {
          alert('User Created successfully');
          this.resetForm();
          this.getUsers();

        },
          error => {
            console.log(error);
          });
      }
      if (this.editing === true) {
        this.userservice.editUser(this.selectedUser._id, this.addUserForm.value).subscribe(res => {
          alert('User Updated successfully');
          this.editing = false;
          this.resetForm();
          this.getUsers();

        },
          error => {
            console.log(error);
          });

      }
    }
  }

  getUsers() {
    this.userservice.fetchUsers().subscribe(data => {
      this.allUsers = data;
    },
      error => {
        console.log(error);
      });
  }

  sortUsers(param) {
    const temp = this.allUsers.sort((n1, n2) => {
      if (n1[param].toLowerCase() > n2[param].toLowerCase()) {
        return 1;
      }

      if (n1[param].toLowerCase() < n2[param].toLowerCase()) {
        return -1;
      }
      // console.log(n2[param]);
      return 0;
    });
    this.allUsers = null;
    // this.allUsers = temp;
    this.allUsers = [];
    this.allUsers = temp;
    // console.log(this.allUsers);

  }

  deleteUser(userid) {
    // console.log(userid);
    this.userservice.deleteUsers(userid).subscribe(data => {
      // console.log(data);
      alert('User Successfully Delete')
      this.getUsers();
    },
      error => {
        console.log(error);
      });
  }

}

