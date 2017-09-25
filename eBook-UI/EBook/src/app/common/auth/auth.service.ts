import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

import { ServerURI } from 'app/app.globals';
import { User } from 'app/user/main/user.model';


@Injectable()
export class AuthService implements OnInit {

  private headers = new Headers();
  private options = new RequestOptions();

  public currentUser = new User();

  constructor(private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
  }

  ngOnInit() {

  }

  login(username: string, password: string, error, success) {
    return this.http.post(`${ServerURI}api/auth`, JSON.stringify({ userName: username, userPassword: password }), this.options).map((response: Response) => {
      if (response.status == 200) {
        this.currentUser = response.json() as User;
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
      } else if (response.status == 401) { 
        // unauthorized..
      }
    }).subscribe(
      data => success(),
      err => error(),
      () => console.log('hureey')
      );
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('currentUser') === null) {
      return false;
    }
    else {
      return true;
    }
  }
}