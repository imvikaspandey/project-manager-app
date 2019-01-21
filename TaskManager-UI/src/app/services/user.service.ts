import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  createUser(formData): Observable<any> {
    // console.log(formData);
    return this.http.post('http://localhost:3000/api/user', formData, httpOptions);

  }

  fetchUsers(): Observable<any> {
    return this.http.get('http://localhost:3000/api/user');
  }

  deleteUsers(userid): Observable<any> {
    return this.http.delete('http://localhost:3000/api/user/' + userid);
  }

  editUser(userid, formData): Observable<any> {
    return this.http.put('http://localhost:3000/api/user/' + userid, formData, httpOptions);
  }
}
