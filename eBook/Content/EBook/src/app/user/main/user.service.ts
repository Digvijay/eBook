import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { User } from 'app/User/main/User.model';
import { ServerURI } from 'app/app.globals';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  constructor(private http: Http) { 
  }

  private UsersUrl = 'api/users/';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
  private opts:RequestOptions = new RequestOptions();
  
  
  getUsers(): Promise<Array<User>> {
    this.opts.headers = this.headers;
    
    return this.http
      .get(ServerURI + this.UsersUrl, this.opts)
      .toPromise()
      .then((response) => {
        return response.json() as Array<User>[];
      })
      .catch(this.handleError);
  }
  
  getUser(id: number): Promise<User> {
    return this.getUsers()
      .then(Users => Users.find(User => User.userId === id));
  }

  save(User: User): Promise<User> {
    if (User.userId) {
      return this.put(User);
    }
    return this.post(User);
  }

  delete(User: User): Promise<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${ServerURI}${this.UsersUrl}${User.userId}`;

    return this.http
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  // Add new User
  private post(User: User): Promise<User> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(ServerURI + this.UsersUrl, JSON.stringify(User), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Update existing User
  private put(User: User): Promise<User> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${ServerURI}${this.UsersUrl}${User.userId}`;

    return this.http
      .put(url, JSON.stringify(User), { headers: headers })
      .toPromise()
      .then(() => User)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
