import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:44330/api/Auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'token', {
      email,
      password
    }, httpOptions);
  }

  register(firstName: string, lastName: string, username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      firstName,
      lastName,
      username,
      email,
      password
    }, httpOptions);
  }
}
