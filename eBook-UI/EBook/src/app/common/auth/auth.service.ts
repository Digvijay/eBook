import { Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

import { ServerURI } from 'app/app.globals';
import { User } from 'app/user/main/user.model';

import { DataService } from 'app/common/services/data.service';


@Injectable()
export class AuthService implements OnInit {

  headers = new Headers();
  options = new RequestOptions();

  currentUser:User;

  constructor(
    private http: Http, 
    private router: Router,
    private dataService: DataService) {
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
      this.dataService.updateData(this.currentUser);
    }).subscribe(
      data => { success(); },
      err => error(),
      () => console.log('hureey')
      );
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.dataService.updateData(null);
    this.router.navigate(['/login']);
  }

  allowAccess(allowedRole: string[]) {
    if(!this.getCurrentUser()) {
      if(!allowedRole.includes('guest')) {
        this.router.navigate(['/login']);
      }
    }
  }

  setNewPassword(password: string) {
    this.currentUser.userPassword = password;
    localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
  }

  getCurrentUser():User {
    return JSON.parse(localStorage.getItem('currentUser')) as User;
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('currentUser') === null) {
      return false;
    }
    else {
      return true;
    }
  }

  public static b64EncodeUnicode(str: string): string {
    if (window
        && "btoa" in window
        && "encodeURIComponent" in window) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
            return String.fromCharCode(("0x" + p1) as any);
        }));
    } else {
        console.warn("b64EncodeUnicode requirements: window.btoa and window.encodeURIComponent functions");
        return null;
    }
  }

  public static b64DecodeUnicode(str: string): string {
    if (window
        && "atob" in window
        && "decodeURIComponent" in window) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(""));
    } else {
        console.warn("b64DecodeUnicode requirements: window.atob and window.decodeURIComponent functions");
        return null;
    }
  }
}