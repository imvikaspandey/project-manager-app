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
export class ProjectService {

  constructor(private http: HttpClient) { }
  createProject(formData): Observable<any> {
    return this.http.post('http://localhost:3000/api/project', formData, httpOptions);

  }

  fetchProject(): Observable<any> {
    return this.http.get('http://localhost:3000/api/project');
  }

  editProject(projectid, formData): Observable<any> {
    return this.http.put('http://localhost:3000/api/project/' + projectid, formData, httpOptions);
  }
}
