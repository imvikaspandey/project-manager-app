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
export class TaskService {

  constructor(private http: HttpClient) { }
  createTask(formData): Observable<any> {
    return this.http.post('http://localhost:3000/api/task', formData, httpOptions);

  }

  fetchParentTask(): Observable<any> {
    return this.http.get('http://localhost:3000/api/parentTasks');
  }

  fetchTask(): Observable<any> {
    return this.http.get('http://localhost:3000/api/task');
  }

  editTask(taskid, formData): Observable<any> {
    return this.http.put('http://localhost:3000/api/task/' + taskid, formData, httpOptions);
  }
}

