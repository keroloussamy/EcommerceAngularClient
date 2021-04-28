import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/Shared/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // ,'Authorization': 'my-auth-token'
    })
  };
  
  constructor(private http: HttpClient) { }

  getUser(id:string): Observable<IUser>
  {
    return this.http.get<IUser>(environment.url_Api+"/api/Users/"+id, this.httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

  deleteUser(id:string): Observable<any>
  {
    return this.http.delete(environment.url_Api+"/api/Users/"+id, this.httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

  getAdmins(): Observable<IUser[]>
  {
    return this.http.get<IUser[]>(environment.url_Api+"/api/Users/admins", this.httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
}
