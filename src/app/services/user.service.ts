import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, tap, map, catchError, of, throwError } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://jsonplaceholder.typicode.com/users/'
  constructor(private http: HttpClient) { }


  private readonly defaultImage = 'https://robohash.org';

  getUsers(): Observable<User[]> {
    let myHeaders = new HttpHeaders({'myheader': ['header value1', 'header value2']});
    myHeaders = myHeaders.set('id','1234');
    myHeaders = myHeaders.append('id', '00000');

    let myParams = new HttpParams().set('page', '5').set('sort', 'true');
    myParams = myParams.append('foo','bar');
    myParams = myParams.set('foo','bah');

    //let myParams = new HttpParams({'fromObject': {'foo':'bar'}});

    //let myParams = new HttpParams({'fromString': "?foo=bar"});

    return this.http.get<User[]>(this.url, {'headers':myHeaders, 'params': myParams}).pipe(
      tap(users => {
        console.log("in the tap");
        console.log(users);
      }),
      // handle error in the pipe
      catchError((error: any) => {
        console.log(error);
        //return throwError(() => {error});
        return this.handleError(error);
      }),
      map(users => {
        return users.map(user => ({
          ...user,
          name: user.name.toUpperCase(),
          image: `${this.defaultImage}/${user.username.toLowerCase()}`,
          isAdmin: user.id === 10? true : false
        }));
      })
    );
  }

  getUser(userid = 1): Observable<User> {
    return this.http.get<User>(this.url + userid).pipe(
      map(user => {
        return {...user, isAdmin: true};
      })
    );
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

  private handleError(error: HttpErrorResponse): Observable<never> {
    if(error.status === 404) return throwError(() => ({code: 404, message:"not found"}));
    return throwError(() => ({code: 400, message:"I am error"}));
  }
}
