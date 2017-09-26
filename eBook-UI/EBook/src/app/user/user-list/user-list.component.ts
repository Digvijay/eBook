import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MdPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { User } from 'app/user/main/user.model';
import { Category } from 'app/category/main/category.model';
import { UserService } from 'app/user/main/user.service';
import { AuthService } from 'app/common/auth/auth.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Array<User>;
  displayedColumns = ['userId', 'firstName', 'lastName', 'userName', 'userType', 'categoryName', 'edit'];
  dataChange: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  dataSource: ExampleDataSource | null;

  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute,
    private authService: AuthService) {
    route.params.subscribe(val => {
      this.setInitialData();    // forces to reload component data after state change. (TODO: different impl)
    });
  }

  ngOnInit() {
    this.authService.allowAccess(['admin']);
    this.setInitialData();
  }

  setInitialData() {
    this.getUsers(x => {
      this.dataChange.next(this.users);
    });

    this.dataSource = new ExampleDataSource(this, this.paginator);
  }

  getUsers(callback): void {
    this.userService
      .getUsers()
      .then(x => { this.users = x; callback() });
  }

}
export interface IUser {
  userId: number;
  firstName: string;
  userName: string;
  lastName: string;
  userPassword: string;
  type: string;
  categoryId: number;
}

export class ExampleDataSource extends DataSource<any> {
  constructor(private _UsersComponent: UserListComponent, private _paginator: MdPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<IUser[]> {
    const displayDataChanges = [
      this._UsersComponent.dataChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._UsersComponent.dataChange.value.slice();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() { }
}