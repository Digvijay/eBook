import { RequestOptions, RequestOptionsArgs, BaseRequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { User } from 'app/user/main/user.model';

@Injectable()
export class RequestOptionsService extends BaseRequestOptions {
  constructor() {
    super();
  }
  merge(options?: RequestOptionsArgs): RequestOptions {
    const newOptions = super.merge(options);
    let currentUser = new User();
    
    if(localStorage.getItem('currentUser') !== null) {
        currentUser = JSON.parse(localStorage.getItem('currentUser')) as User;
    }

    if(currentUser.userName && currentUser.userPassword) {
        newOptions.headers.set('Authorization',
        `Basic ${btoa(currentUser.userName + ":" + currentUser.userPassword)}`);
    }
    
    return newOptions;
  }
}