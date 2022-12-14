import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://jsonplaceholder.typicode.com/users/'
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUser(userid = 1): Observable<User> {
    return this.http.get<User>(this.url + userid);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.url + user.id, user);
  }

  updateUserWithPatch(user: any): Observable<User> {
    return this.http.patch<User>(this.url + '/' + user['id'], user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id);
  }
}
