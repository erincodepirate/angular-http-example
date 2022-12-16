import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://jsonplaceholder.typicode.com/users/'
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    let myHeaders = new HttpHeaders({'myheader': ['header value1', 'header value2']});
    myHeaders = myHeaders.set('id','1234');
    myHeaders = myHeaders.append('id', '00000');

    let myParams = new HttpParams().set('page', '5').set('sort', 'true');
    myParams = myParams.append('foo','bar');
    myParams = myParams.set('foo','bah');

    //let myParams = new HttpParams({'fromObject': {'foo':'bar'}});

    //let myParams = new HttpParams({'fromString': "?foo=bar"});

    return this.http.get<User[]>(this.url, {'headers':myHeaders, 'params': myParams});
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

  getTextFile(): Observable<string> {
    return this.http.get(`assets/text.txt`, { responseType: 'text' })
  }

  getBlobFile(): Observable<HttpResponse<Blob>> {
    return this.http.get(`assets/text.txt`, { responseType: 'blob', observe: 'response' })
  }
}
