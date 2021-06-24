import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LoginUser, User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: no-shadowed-variable
  addNewUser(User: User): Observable<User> {
    const url = `${environment.apiUrl}/usuarios/cadastro`;
    return this.http.post<User>(url, User);
  }

  login(User: LoginUser): Observable<LoginUser> {
    const url = `${environment.apiUrl}/usuarios/login`;
    return this.http.post<LoginUser>(url, User);
  }

  
}
